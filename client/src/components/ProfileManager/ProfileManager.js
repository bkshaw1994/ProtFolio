import React, { useState } from 'react';
import {
  User,
  Image as ImageIcon,
  FileText,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Sparkles
} from 'lucide-react';
import {
  useGetProfileQuery,
  useUploadProfileImageMutation,
  useUploadResumeMutation,
  useDeleteFileMutation
} from '../../features/api/apiSlice';
import FileUpload from '../FileUpload/FileUpload';
import { getFileUrl } from '../../utils/apiUrl';

const ProfileManager = () => {
  const { data: profileData } = useGetProfileQuery();
  const profile = profileData?.data || profileData;

  const [uploadImage, { isLoading: isUploadingImage }] = useUploadProfileImageMutation();
  const [uploadResume, { isLoading: isUploadingResume }] = useUploadResumeMutation();
  const [deleteFile, { isLoading: isDeletingFile }] = useDeleteFileMutation();

  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      await uploadImage(formData).unwrap();
      setUploadStatus({ type: 'success', message: 'Profile image uploaded successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 4000);
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

      await uploadResume(formData).unwrap();
      setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 4000);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error?.data?.message || 'Failed to upload resume'
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm('Are you sure you want to delete your profile image?')) return;
    try {
      await deleteFile('image').unwrap();
      setUploadStatus({ type: 'success', message: 'Profile image deleted successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 4000);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error?.data?.message || 'Failed to delete image'
      });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return;
    try {
      await deleteFile('resume').unwrap();
      setUploadStatus({ type: 'success', message: 'Resume deleted successfully!' });
      setTimeout(() => setUploadStatus({ type: '', message: '' }), 4000);
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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl">
          <UploadCloud size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manage Profile Assets</h2>
          <p className="text-xs text-slate-500">
            Upload and update your headshot photo and official PDF resume
          </p>
        </div>
      </div>

      {/* Status Alert Banner */}
      {uploadStatus.message && (
        <div
          className={`flex items-center space-x-2 p-3.5 rounded-xl text-xs font-semibold mb-6 border ${
            uploadStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-rose-500 shrink-0" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}

      {/* Asset Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image Section */}
        <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ImageIcon size={18} className="text-primary-600" />
              <h3 className="font-bold text-sm text-slate-800">Profile Image</h3>
            </div>

            <FileUpload
              accept="image/*"
              maxSize={5 * 1024 * 1024} // 5MB
              onFileSelect={handleImageUpload}
              isLoading={isUploadingImage || isDeletingFile}
              currentFile={getImageFileName()}
              onDelete={profile?.profileImage ? handleDeleteImage : null}
              uploadType="image"
            />
          </div>

          {profile?.profileImage && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center space-x-4">
              <img
                src={getFileUrl(profile.profileImage)}
                alt="Profile Preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-500 shadow-sm"
                crossOrigin="anonymous"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Active Avatar</span>
                <span className="text-slate-500 text-[11px]">Displayed in Navbar & Hero</span>
              </div>
            </div>
          )}
        </div>

        {/* Resume PDF Section */}
        <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileText size={18} className="text-primary-600" />
              <h3 className="font-bold text-sm text-slate-800">Resume Document (PDF)</h3>
            </div>

            <FileUpload
              accept="application/pdf"
              maxSize={10 * 1024 * 1024} // 10MB
              onFileSelect={handleResumeUpload}
              isLoading={isUploadingResume || isDeletingFile}
              currentFile={getResumeFileName()}
              onDelete={profile?.resume ? handleDeleteResume : null}
              uploadType="resume"
            />
          </div>

          {profile?.resume && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap gap-2">
              <a
                href={getFileUrl(profile.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:text-primary-600 hover:border-primary-300 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Eye size={15} />
                <span>View PDF</span>
              </a>
              <a
                href={getFileUrl(profile.resume)}
                download
                className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
