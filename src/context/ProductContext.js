import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../config';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(getApiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      // Fallback to default products if API fails
      setProducts([
        { id: 1, name_id: 'Tas Custom', name_en: 'Custom Bags', description_id: 'Tas berkualitas tinggi dengan desain custom', description_en: 'High-quality bags with custom design', category: 'bags', image: '/img/tas imlek.jpg' },
        { id: 2, name_id: 'Sticker', name_en: 'Stickers', description_id: 'Sticker berkualitas tinggi', description_en: 'Quality stickers', category: 'stickers', image: '/img/stk.jpg' },
        { id: 3, name_id: 'Topi Ulang Tahun', name_en: 'Birthday Hats', description_id: 'Topi pesta ulang tahun', description_en: 'Birthday party hats', category: 'party', image: '/img/topi.jpg' },
        { id: 4, name_id: 'Backdrop / Banner', name_en: 'Backdrop / Banner', description_id: 'Backdrop dan banner berkualitas', description_en: 'Quality backdrops and banners', category: 'banners', image: '/img/bd.jpeg' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const formData = new FormData();
      formData.append('name_id', product.name_id);
      formData.append('name_en', product.name_en);
      formData.append('description_id', product.description_id);
      formData.append('description_en', product.description_en);
      formData.append('category_id', product.category_id || '');
      if (product.image) {
        formData.append('image', product.image);
      }

      const res = await fetch(getApiUrl('/api/products'), {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to add product');
      
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      return true;
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Gagal menambahkan produk: ' + err.message);
      return false;
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const formData = new FormData();
      formData.append('name_id', product.name_id);
      formData.append('name_en', product.name_en);
      formData.append('description_id', product.description_id);
      formData.append('description_en', product.description_en);
      formData.append('category_id', product.category_id || '');
      if (product.image) {
        formData.append('image', product.image);
      }

      const res = await fetch(getApiUrl(`/api/products/${id}`), {
        method: 'PUT',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to update product');
      
      const updatedProduct = await res.json();
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return true;
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Gagal mengupdate produk: ' + err.message);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(getApiUrl(`/api/products/${id}`), {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete product');
      
      setProducts(products.filter(p => p.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Gagal menghapus produk: ' + err.message);
      return false;
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};