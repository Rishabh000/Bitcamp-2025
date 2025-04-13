import React, { useState } from 'react';

function StudentResume() {
  const [file, setFile] = useState(null);
  const [currentResume, setCurrentResume] = useState({
    name: 'John_Doe_Resume.pdf',
    size: '342 KB',
    date: 'April 10, 2025'
  });
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      // In a real application, this would upload the file to a server
      setCurrentResume({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })
      });
      alert('Resume uploaded successfully!');
      setFile(null);
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="tab-content">
      <h3>Upload Resume</h3>
      <p>Upload your resume to apply for assistantship positions. Accepted formats: PDF, DOCX.</p>
      
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="resume-file">Resume</label>
          <input 
            type="file" 
            id="resume-file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />
        </div>
        
        {currentResume && (
          <div className="uploaded-file">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <div className="file-name">{currentResume.name}</div>
              <div className="file-size">{currentResume.size} • Uploaded on {currentResume.date}</div>
            </div>
            <button type="button" className="btn btn-outline">Replace</button>
          </div>
        )}
        
        <button type="submit" className="btn" style={{ marginTop: '1.5rem' }}>
          Upload New Resume
        </button>
      </form>
    </div>
  );
}

export default StudentResume;