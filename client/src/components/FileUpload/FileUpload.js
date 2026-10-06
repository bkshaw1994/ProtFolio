import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  File,
  Trash2,
  Loader2
} from 'lucide-react';

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
    if (
      accept &&
      !accept.split(',').some((type) =>
        file.type.match(type.trim().replace('*', '.*'))
      )
    ) {
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
        return <ImageIcon className="w-8 h-8 text-primary-500" />;
      case 'resume':
        return <FileText className="w-8 h-8 text-indigo-500" />;
      default:
        return <File className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {currentFile && (
        <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs">
          <div className="flex items-center space-x-2 truncate">
            {getIcon()}
            <span className="font-semibold text-slate-700 truncate">
              {currentFile}
            </span>
          </div>

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={isLoading}
              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex items-center space-x-1 shrink-0 ml-2"
              title="Remove File"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline font-medium">Remove</span>
            </button>
          )}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-2 ${
          dragActive
            ? 'border-primary-500 bg-primary-50/50'
            : 'border-slate-300 hover:border-primary-400 bg-white hover:bg-slate-50/80'
        } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
          <div className="flex flex-col items-center space-y-2 text-slate-500 text-xs">
            <Loader2 className="w-7 h-7 text-primary-600 animate-spin" />
            <span>Uploading asset...</span>
          </div>
        ) : (
          <>
            <div className="p-3 bg-slate-100 rounded-full">{getIcon()}</div>
            <p className="text-xs font-semibold text-slate-700">{getUploadText()}</p>
            <p className="text-[11px] text-slate-400">
              Max size: {formatFileSize(maxSize)}
              {accept && ` • ${accept}`}
            </p>
          </>
        )}
      </div>

      {error && <div className="text-xs text-rose-600 font-semibold">{error}</div>}
    </div>
  );
};

export default FileUpload;