import React from 'react';
import ProfileManager from '../../components/ProfileManager';
import RecommendationManager from '../../components/RecommendationManager/RecommendationManager';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Portfolio Admin Panel</h1>
          <p>Manage your portfolio content, profile details, and LinkedIn recommendations</p>
        </div>
        
        <ProfileManager />
        
        <RecommendationManager />
      </div>
    </div>
  );
};

export default Admin;