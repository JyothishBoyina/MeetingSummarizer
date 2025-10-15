import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryDisplay from "./components/SummaryDisplay";
import "./App.css";

function App() {
  const [summaryData, setSummaryData] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Meeting Summarizer</h1>
        <p>Upload your meeting audio and get instant insights.</p>
      </header>

      <main>
        <FileUpload setSummaryData={setSummaryData} />
        
        {summaryData && (
          <>
            <div className="file-processed-message">
              ✅ File processed successfully! Here's your meeting summary:
            </div>
            <SummaryDisplay data={summaryData} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Meeting Summarizer | Built with ❤️ using React</p>
      </footer>
    </div>
  );
}

export default App;