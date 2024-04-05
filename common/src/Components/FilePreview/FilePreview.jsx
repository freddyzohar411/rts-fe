import React, { useState, useEffect } from 'react';
function FilePreview({ file }) {
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
      // Create a URL for the file
      if (!file) {
        return;
      }
      const url = URL.createObjectURL(file);
      setFileUrl(url);
  
      // Cleanup: revoke the object URL to avoid memory leaks
      return () => URL.revokeObjectURL(url);
    }, [file]);
  
    return (
      <div>
        {/* Only display the iframe if there is a file */}
        {file && (
          <iframe
            src={fileUrl}
            style={{ width: '100%', height: '700px' }}
          ></iframe>
        )}
      </div>
    );
  }
  
  export default FilePreview;