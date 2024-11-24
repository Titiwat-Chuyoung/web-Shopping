import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // ดึงข้อมูลสินค้าเมื่อโหลด component
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  // อัพเดทข้อมูลใน form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // เพิ่มหรืออัพเดทสินค้า
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // อัพเดทสินค้า
      axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData)
        .then(() => {
          fetchProducts();
          setEditingProduct(null);
          setFormData({ name: '', description: '', price: '', image_url: '' });
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      // เพิ่มสินค้าใหม่
      axios.post('http://localhost:5000/api/products', formData)
        .then(() => {
          fetchProducts();
          setFormData({ name: '', description: '', price: '', image_url: '' });
        })
        .catch(error => console.error('Error adding product:', error));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => fetchProducts())
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">{product.price} บาท</td>
              <td className="border p-2">
                <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
