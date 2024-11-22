import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile, changePassword } from '../utils/userService';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserProfile = async () => {
      
            try {
              if (token) {
                const userData = await fetchUserProfile(token);
                setUser(userData);
              } else {
                setError('No token found. Please log in.');
              }
            } catch (error) {
              setError('Failed to load profile. Please try again later.');
            }
          };
      
          getUserProfile();
        }, [token]);
      
        if (error) {
          return <div className="error-message">{error}</div>;
        }
      
        if (!user) {
          return <div className="loading">Loading...</div>;
        }

  const handleProfileUpdate = async () => {
    try {
      const updatedUser = await updateUserProfile(token, updatedProfile);
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword(token, passwordData);
      setMessage('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setError('Failed to change password. Please try again.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {message && <div className="success-message">{message}</div>}
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        {editMode ? (
          <div className="edit-profile">
            <input
              type="text"
              value={updatedProfile.name}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedProfile.email}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
              placeholder="Email"
            />
            <button onClick={handleProfileUpdate} className="update-button">Update Profile</button>
            <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="edit-button">Edit Profile</button>
        )}

        <div className="change-password">
          <h3>Change Password</h3>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            placeholder="Current Password"
          />
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            placeholder="New Password"
          />
          <button onClick={handlePasswordChange} className="change-password-button">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
