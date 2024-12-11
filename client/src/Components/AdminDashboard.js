import React, { useState } from 'react';
import axios from 'axios';
import AddProductForm from './AddProductForm';
const apiUrl = 'https://glowkart-backend-nqnn.onrender.com'; // Correct backend URL

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [isEditing, setIsEditing] = useState(null);
  const [token, setToken] = useState('');
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [adminCreation, setAdminCreation] = useState({
    email: '',
    password: '',
  });

  const fetchProducts = async () => {
    try {
      const url = token
        ? `${apiUrl}/api/admin/products`
        : `${apiUrl}/api/products`;
      const options = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await axios.get(url, options);
      const productData = token ? response.data.products : response.data; // Adjust based on response structure
      setProducts(productData || []);
    } catch (error) {
      console.error(
        'Error fetching products:',
        error.response?.data || error.message
      );
      alert(
        'Failed to fetch products: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    }
  };

  // Handle Admin Registration
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/user/adminuser`,
        {
          name: adminCreation.name, // Make sure to include name
          email: adminCreation.email,
          password: adminCreation.password,
        }
      );
      alert(response.data.message || 'Admin created successfully');
      setAdminCreation({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Detailed error:', error.response?.data || error);
      alert(
        'Failed to create admin: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${apiUrl}/user/loginuser`,
        {
          email,
          password,
          // Add this to match backend expectation
          loginAttempt: true,
        }
      );
      if (response.data.token) {
        const adminToken = response.data.token;
        localStorage.setItem('token', adminToken);
        setToken(adminToken);
        fetchProducts(); // Fetch products after successful login
      } else {
        alert('Not an admin user');
      }
    } catch (error) {
      console.error('Admin login full error:', error.response || error);
      alert(
        'Login failed: ' + (error.response?.data?.message || 'Unknown error')
      );
    }
  };

  return (
    <div className="admin-dashboard">
      {!token ? (
        <>
          <div className="login-form">
            <h1>Admin Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdminLogin(
                  loginCredentials.email,
                  loginCredentials.password
                );
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={loginCredentials.email}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value,
                  })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginCredentials.password}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="create-admin-form">
            <h1>Create Admin</h1>
            <form onSubmit={handleCreateAdmin}>
              <input
                type="text"
                placeholder="Name"
                value={adminCreation.name || ''} // Add a default empty string to avoid undefined errors
                onChange={(e) =>
                  setAdminCreation({ ...adminCreation, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={adminCreation.email}
                onChange={(e) =>
                  setAdminCreation({ ...adminCreation, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={adminCreation.password}
                onChange={(e) =>
                  setAdminCreation({
                    ...adminCreation,
                    password: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Create Admin</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1>Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setToken('');
            }}
          >
            Logout
          </button>
          <div>
            <h2>Products</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
            <AddProductForm />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
