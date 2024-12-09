import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        imageUrl: ''
    });
    const [isEditing, setIsEditing] = useState(null);

    // Authentication token (you'll need to manage this in your app)
    const token = localStorage.getItem('token');

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products', {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        }
    };

    // Add new product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/products/add', newProduct, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            setProducts([...products, response.data.product]);
            // Reset form
            setNewProduct({
                name: '',
                price: '',
                category: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    // Update product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/products/update/${isEditing._id}`, newProduct, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            // Update products list
            const updatedProducts = products.map(product => 
                product._id === isEditing._id ? response.data.product : product
            );
            
            setProducts(updatedProducts);
            // Reset editing state and form
            setIsEditing(null);
            setNewProduct({
                name: '',
                price: '',
                category: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    // Delete product
    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/delete/${productId}`, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            // Remove product from list
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    // Prepare product for editing
    const startEditing = (product) => {
        setIsEditing(product);
        setNewProduct({
            name: product.name,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl
        });
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            {/* Product Form */}
            <form onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    required 
                />
                <button type="submit">
                    {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                {isEditing && (
                    <button type="button" onClick={() => {
                        setIsEditing(null);
                        setNewProduct({name: '', price: '', category: '', imageUrl: ''});
                    }}>
                        Cancel
                    </button>
                )}
            </form>

            {/* Product List */}
            <div className="product-list">
                <h2>Existing Products</h2>
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} style={{width: '100px', height: '100px'}} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                        <div>
                            <button onClick={() => startEditing(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;