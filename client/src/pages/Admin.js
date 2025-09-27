import React from 'react';
import ProfileManager from '../components/ProfileManager/ProfileManager';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Portfolio Admin Panel</h1>
          <p>Manage your portfolio content and assets</p>
        </div>
        
        <ProfileManager />
        
        <div className="admin-section">
          <h2>Additional Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📊 Analytics</h3>
              <p>View portfolio performance metrics</p>
              <button className="feature-btn" disabled>Coming Soon</button>
            </div>
            <div className="feature-card">
              <h3>✏️ Content Editor</h3>
              <p>Edit profile information and content</p>
              <button className="feature-btn" disabled>Coming Soon</button>
            </div>
            <div className="feature-card">
              <h3>🎨 Theme Settings</h3>
              <p>Customize colors and appearance</p>
              <button className="feature-btn" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;