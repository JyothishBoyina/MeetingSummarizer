import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ Import backend URL

function FileUpload({ setSummaryData }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an audio file!");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);
      console.log("📤 Sending file to backend:", file.name, file.type, file.size);

      // ✅ Use deployed backend URL from config
      const res = await axios.post(
        `${API_BASE_URL}/api/summarize`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000, // 60 second timeout
        }
      );

      console.log("✅ Backend response:", res.data);
      setSummaryData(res.data);

    } catch (error) {
      console.error("❌ Full error details:", error);

      if (error.response) {
        console.error("❌ Server error response:", error.response.data);
        console.error("❌ Server error status:", error.response.status);
        alert(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        console.error("❌ No response from server:", error.request);
        alert("No response from server. Please check your backend deployment.");
      } else {
        console.error("❌ Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div className="file-input-wrapper">
          <label className="file-label">Upload your meeting audio</label>
          <label className="custom-file-btn">
            Choose File
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
          {file && (
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-size">Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              <p className="file-type">Type: {file.type}</p>
            </div>
          )}
        </div>

        <button type="submit" className="upload-btn" disabled={loading || !file}>
          {loading ? "🔄 Processing..." : "📤 Upload & Summarize"}
        </button>

        {loading && (
          <div className="loading-info">
            <p>⏳ Processing audio file... This may take a minute.</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default FileUpload;
