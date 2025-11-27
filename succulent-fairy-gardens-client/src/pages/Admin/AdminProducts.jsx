import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  'small-containers', 'medium-containers', 'large-containers',
  'small-figurines', 'medium-figurines', 'large-figurines',
  'accessories', 'decorative-stones',
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  
  const [form, setForm] = useState({
    _id: null,
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'accessories',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      _id: null, name: '', price: '', description: '', image: '', category: 'accessories',
    });
  };

  const handleEditClick = (product) => {
    setForm({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const productData = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      category: form.category,
    };

    try {
      if (form._id) {
        await axios.put(
          `/api/admin/products/${form._id}`,
          productData,
          config
        );
      } else {
        await axios.post(
          `/api/admin/products`,
          productData,
          config
        );
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/admin/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-6">Manage Products</h2>
      
      <form onSubmit={handleSubmit} className="bg-bg-soft p-8 rounded-2xl border border-primary mb-8">
        <h3 className="text-2xl mb-4">{form._id ? 'Edit Product' : 'Add New Product'}</h3>
        <div className="mb-5">
          <label className="block mb-1 font-bold">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleFormChange} className="form-control" required />
        </div>
        <div className="mb-5">
          <label className="block mb-1 font-bold">Price (R)</label>
          <input type="number" name="price" value={form.price} onChange={handleFormChange} className="form-control" required />
        </div>
        <div className="mb-5">
          <label className="block mb-1 font-bold">Description</label>
          <textarea name="description" value={form.description} onChange={handleFormChange} className="form-control" required></textarea>
        </div>
        <div className="mb-5">
          <label className="block mb-1 font-bold">Image URL</label>
          <input type="text" name="image" value={form.image} onChange={handleFormChange} className="form-control" placeholder="https://... or /images/my-image.jpg" required />
        </div>
        <div className="mb-5">
          <label className="block mb-1 font-bold">Category</label>
          <select name="category" value={form.category} onChange={handleFormChange} className="form-control">
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button type="submit" className="btn">{form._id ? 'Update' : 'Create'}</button>
        {form._id && <button type="button" className="btn btn-secondary ml-4" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h3 className="text-2xl mb-4">Existing Products</h3>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>R{product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="btn btn-secondary text-sm py-2 px-4 mr-2" onClick={() => handleEditClick(product)}>Edit</button>
                    <button className="btn btn-danger text-sm py-2 px-4" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;