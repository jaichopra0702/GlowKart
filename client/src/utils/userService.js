const apiUrl = 'https://glowkart-backend-nqnn.onrender.com'; // Correct backend URL
export const fetchUserProfile = async () => {
  
  try {
    const response = await fetch(`${apiUrl}/user/myAccount`, {
      method: 'GET',
      credentials: 'include', // Ensure session cookie is sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (updatedProfile) => {
  try {
    const response = await fetch(`${apiUrl}/user/myAccount`, {
      method: 'PUT',
      credentials: 'include', // Ensure session cookie is sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await fetch(`${apiUrl}/user/password`, {
      method: 'PUT',
      credentials: 'include', // Ensure session cookie is sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      throw new Error('Failed to change password');
    }

    return await response.json();
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
