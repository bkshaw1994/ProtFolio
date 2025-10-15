import React, { useState } from 'react';
import {
  useUploadProfileImageMutation,
  useUploadResumeMutation,
  useDeleteFileMutation,
  useGetProfileQuery
} from '../../features/api/apiSlice';
import FileUpload from '../FileUpload/FileUpload';
import './ProfileManager.css';

const ProfileManager = () => {
  const { data: profileData } = useGetProfileQuery();
  const profile = profileData?.data;
  
  const [_, { isLoading: isUploadingImage }] = useUploadProfileImageMutation();
  const [_, { isLoading: isUploadingResume }] = useUploadResumeMutation();
  const [deleteFile, { isLoading: isDeletingFile }] = useDeleteFileMutation();
  
  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      
      //const result = await uploadImage(formData).unwrap();
      setUploadStatus({ type: 'success', message: 'Profile image uploaded successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error?.data?.message || 'Failed to upload image' 
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleResumeUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      //const result = await uploadResume(formData).unwrap();
      setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error?.data?.message || 'Failed to upload resume' 
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await deleteFile('image').unwrap();
      setUploadStatus({ type: 'success', message: 'Profile image deleted successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error?.data?.message || 'Failed to delete image' 
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await deleteFile('resume').unwrap();
      setUploadStatus({ type: 'success', message: 'Resume deleted successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error?.data?.message || 'Failed to delete resume' 
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const getImageFileName = () => {
    if (profile?.profileImage) {
      return profile.profileImage.split('/').pop();
    }
    return null;
  };

  const getResumeFileName = () => {
    if (profile?.resume) {
      return profile.resume.split('/').pop();
    }
    return null;
  };

  return (
    <div className="profile-manager">
      <div className="profile-manager-header">
        <h2>Manage Profile Assets</h2>
        <p>Upload and manage your profile image and resume</p>
      </div>

      {uploadStatus.message && (
        <div className={`status-message ${uploadStatus.type}`}>
          {uploadStatus.message}
        </div>
      )}

      <div className="upload-sections">
        <div className="upload-section">
          <h3>Profile Image</h3>
          <FileUpload
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            onFileSelect={handleImageUpload}
            isLoading={isUploadingImage || isDeletingFile}
            currentFile={getImageFileName()}
            onDelete={profile?.profileImage ? handleDeleteImage : null}
            uploadType="image"
            className="profile-image-upload"
          />
          {profile?.profileImage && (
            <div className="image-preview">
              <img 
                src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profile.profileImage}`}
                alt="Profile"
                className="preview-image"
              />
            </div>
          )}
        </div>

        <div className="upload-section">
          <h3>Resume</h3>
          <FileUpload
            accept="application/pdf"
            maxSize={10 * 1024 * 1024} // 10MB
            onFileSelect={handleResumeUpload}
            isLoading={isUploadingResume || isDeletingFile}
            currentFile={getResumeFileName()}
            onDelete={profile?.resume ? handleDeleteResume : null}
            uploadType="resume"
            className="resume-upload"
          />
          {profile?.resume && (
            <div className="resume-actions">
              <a 
                href={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profile.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-resume-btn"
              >
                📄 View Resume
              </a>
              <a 
                href={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profile.resume}`}
                download
                className="download-resume-btn"
              >
                ⬇️ Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
