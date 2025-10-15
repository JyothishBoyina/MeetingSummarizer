import React from "react";

function SummaryDisplay({ data }) {
  const formatSummary = (text) => {
    if (!text) return "No summary available.";
    
    return text.split('\n').map((line, index) => {
      if (line.includes('•') || line.includes('✅') || line.includes('1.')) {
        return (
          <div key={index} style={{ marginLeft: '20px', marginBottom: '8px' }}>
            {line}
          </div>
        );
      } else if (line.trim() && !line.includes('---') && !line.includes('===')) {
        if (line.toUpperCase() === line && line.length < 50) {
          return (
            <h3 key={index} style={{ marginTop: '20px', marginBottom: '10px', color: '#1e293b' }}>
              {line}
            </h3>
          );
        }
        return (
          <p key={index} style={{ marginBottom: '12px', lineHeight: '1.5' }}>
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="summary-container">
      <h2>Meeting Summary</h2>
      
      {data && data.summary ? (
        <div className="summary-content">
          {formatSummary(data.summary)}
        </div>
      ) : (
        <p>No summary available.</p>
      )}

      {/* Show transcript if available */}
      {data && data.transcript && (
        <div className="transcript-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <h3>Meeting Transcript</h3>
          <div className="transcript-content" style={{ 
            backgroundColor: '#f8fafc', 
            padding: '15px', 
            borderRadius: '8px',
            maxHeight: '200px',
            overflowY: 'auto',
            fontSize: '0.9rem',
            lineHeight: '1.4'
          }}>
            {data.transcript.split('\n').map((line, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SummaryDisplay;
