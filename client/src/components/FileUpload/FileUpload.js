import React, { useRef, useState } from 'react';
import './FileUpload.css';

const FileUpload = ({
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  onFileSelect,
  isLoading = false,
  currentFile = null,
  onDelete = null,
  uploadType = 'file',
  className = ''
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    setError('');

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    if (accept && !accept.split(',').some(type => 
      file.type.match(type.trim().replace('*', '.*'))
    )) {
      setError(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUploadText = () => {
    switch (uploadType) {
      case 'image':
        return 'Drop your profile image here or click to browse';
      case 'resume':
        return 'Drop your resume (PDF) here or click to browse';
      default:
        return 'Drop your file here or click to browse';
    }
  };

  const getIcon = () => {
    switch (uploadType) {
      case 'image':
        return '🖼️';
      case 'resume':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <div className={`file-upload-container ${className}`}>
      {currentFile && (
        <div className="current-file">
          <div className="current-file-info">
            <span className="file-icon">{getIcon()}</span>
            <span className="file-name">Current {uploadType}: {currentFile}</span>
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="delete-btn"
                disabled={isLoading}
              >
                🗑️ Remove
              </button>
            )}
          </div>
        </div>
      )}
      
      <div
        className={`file-upload ${dragActive ? 'drag-active' : ''} ${isLoading ? 'loading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <div className="upload-content">
            <div className="loading-spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">{getIcon()}</div>
            <p className="upload-text">{getUploadText()}</p>
            <p className="upload-hint">
              Max size: {formatFileSize(maxSize)}
              {accept && ` • Formats: ${accept}`}
            </p>
          </div>
        )}
      </div>
      
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default FileUpload;