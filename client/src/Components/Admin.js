import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/admin/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data.product]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Edit product
  const editProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/admin/products/${updatedProduct.id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(
        products.map((p) =>
          p.id === updatedProduct.id ? response.data.product : p
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Sub-components for UI
  const AdminNavbar = () => <div className="admin-navbar"><h1>Admin Dashboard</h1></div>;

  const ProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      addProduct({ name, price });
      setName("");
      setPrice("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    );
  };

  const ProductListAdmin = () => (
    <div className="product-list-admin">
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <button onClick={() => setEditingProduct(product)}>Edit</button>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );

  const EditProduct = () => {
    const [name, setName] = useState(editingProduct?.name || "");
    const [price, setPrice] = useState(editingProduct?.price || "");

    const handleSubmit = (e) => {
      e.preventDefault();
      editProduct({ id: editingProduct.id, name, price });
    };

    if (!editingProduct) return null;

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    );
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <ProductForm />
      {editingProduct ? <EditProduct /> : <ProductListAdmin />}
    </div>
  );
};

export default Admin;