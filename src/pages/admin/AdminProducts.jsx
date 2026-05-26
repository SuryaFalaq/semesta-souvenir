import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProducts } from '../../context/ProductContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { getImageUrl } from '../../config';

const AdminProducts = () => {
  const { language } = useLanguage();
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name_id: '', name_en: '', description_id: '', description_en: '', category_id: '', image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name_id: '', name_en: '', description_id: '', description_en: '', category_id: '', image: null });
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name_id: product.name_id || '',
      name_en: product.name_en || '',
      description_id: product.description_id || '',
      description_en: product.description_en || '',
      category_id: product.category_id || '',
      image: null
    });
    setPreviewImage(product.image ? getImageUrl(product.image) : null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      ...formData,
      image: formData.image || (editingProduct ? editingProduct.image : null)
    };

    let success;
    if (editingProduct) {
      success = await updateProduct(editingProduct.id, productData);
    } else {
      success = await addProduct(productData);
    }

    setIsSubmitting(false);
    if (success) {
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus produk?')) {
      await deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name_id: '', name_en: '', description_id: '', description_en: '', category_id: '', image: null });
    setPreviewImage(null);
  };

  const getCategoryName = (product) => {
    if (product.category_id) return 'products';
    return product.category || '-';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#61525a]" />
        <span className="ml-2 text-[#736c64]">Memuat produk...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1e1919]">Kelola Produk</h2>
          <p className="text-[#736c64]">Total: {products.length} produk</p>
        </div>
        <Button onClick={openAddModal} className="bg-[#1e1919] hover:bg-[#61525a]">
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <p className="text-[#736c64] mb-4">Belum ada produk</p>
          <Button onClick={openAddModal} className="bg-[#1e1919]">
            <Plus className="w-4 h-4 mr-2" /> Tambah Produk Pertama
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg">
              <div className="aspect-[4/3] bg-[#f7f5f2]">
                {product.image ? (
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name_id} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#736c64]">Tidak ada gambar</div>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-medium tracking-widest uppercase text-[#61525a]">
                  {getCategoryName(product)}
                </span>
                <h3 className="text-lg font-semibold text-[#1e1919] mt-1">{product[`name_${language}`]}</h3>
                <p className="text-sm text-[#736c64] mt-2 line-clamp-2">{product[`description_${language}`]}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(product)} className="flex-1">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#f7f5f2] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e1919]">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
              <button onClick={handleCancel} className="p-2 hover:bg-[#f7f5f2] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama (Indonesia) *</Label>
                  <Input name="name_id" value={formData.name_id} onChange={handleChange} required placeholder="Tas Custom" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Nama (English) *</Label>
                  <Input name="name_en" value={formData.name_en} onChange={handleChange} required placeholder="Custom Bags" className="w-full" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Deskripsi (Indonesia) *</Label>
                  <Textarea name="description_id" value={formData.description_id} onChange={handleChange} required rows={3} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi (English) *</Label>
                  <Textarea name="description_en" value={formData.description_en} onChange={handleChange} required rows={3} className="w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white">
                  <option value="">Pilih Kategori</option>
                  <option value="1">Tas</option>
                  <option value="2">Sticker</option>
                  <option value="3">Pesta</option>
                  <option value="4">Banner</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Gambar Produk</Label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 rounded-lg p-2" />
                {previewImage && (
                  <div className="mt-2">
                    <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel} className="flex-1" disabled={isSubmitting}>Batal</Button>
                <Button type="submit" className="flex-1 bg-[#1e1919]" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;