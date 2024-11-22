export const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`http://localhost:5000/user/myAccount`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
  
  export const updateUserProfile = async (token, updatedProfile) => {
    const response = await fetch('http://localhost:5000/user/myAccount', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  };
  
  export const changePassword = async (token, passwordData) => {
    const response = await fetch('http://localhost:5000/user/password', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error('Failed to change password');
    return response.json();
  };
  