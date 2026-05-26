import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { getApiUrl } from '../../config';

const AdminCategories = () => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name_id: '', name_en: '', description_id: '', description_en: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(getApiUrl('/api/categories'));
      if (res.ok) setCategories(await res.json());
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name_id: '', name_en: '', description_id: '', description_en: '' });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name_id: cat.name_id, name_en: cat.name_en, description_id: cat.description_id || '', description_en: cat.description_en || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editing ? getApiUrl(`/api/categories/${editing.id}`) : getApiUrl('/api/categories');
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        fetchCategories();
      }
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(language === 'id' ? 'Hapus kategori ini?' : 'Delete this category?')) return;
    try {
      const res = await fetch(getApiUrl(`/api/categories/${id}`), { method: 'DELETE' });
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-[#736c64]">{language === 'id' ? 'Kelola kategori produk' : 'Manage product categories'}</p>
        <Button className="bg-[#1e1919]" onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          {language === 'id' ? 'Tambah Kategori' : 'Add Category'}
        </Button>
      </div>

      {loading ? (
        <p className="text-[#736c64]">{language === 'id' ? 'Memuat...' : 'Loading...'}</p>
      ) : categories.length === 0 ? (
        <p className="text-[#736c64]">{language === 'id' ? 'Belum ada kategori' : 'No categories yet'}</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f7f5f2] bg-[#f7f5f2]">
                <th className="text-left p-4 text-[#736c64] text-sm font-medium">ID</th>
                <th className="text-left p-4 text-[#736c64] text-sm font-medium">Indonesia</th>
                <th className="text-left p-4 text-[#736c64] text-sm font-medium">English</th>
                <th className="text-right p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Aksi' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-[#f7f5f2] last:border-0 hover:bg-[#f7f5f2] transition-colors">
                  <td className="p-4 text-[#736c64] text-sm">#{cat.id}</td>
                  <td className="p-4 text-[#1e1919] font-medium">{cat.name_id}</td>
                  <td className="p-4 text-[#736c64]">{cat.name_en}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-2 hover:bg-[#f7f5f2] rounded-lg transition-colors">
                        <Pencil className="w-4 h-4 text-[#61525a]" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1e1919]">
                {editing
                  ? (language === 'id' ? 'Edit Kategori' : 'Edit Category')
                  : (language === 'id' ? 'Tambah Kategori' : 'Add Category')}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#f7f5f2] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e1919] mb-1">Nama (Indonesia)</label>
                <Input value={form.name_id} onChange={(e) => setForm({...form, name_id: e.target.value})} required className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e1919] mb-1">Name (English)</label>
                <Input value={form.name_en} onChange={(e) => setForm({...form, name_en: e.target.value})} required className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e1919] mb-1">Deskripsi (Indonesia)</label>
                <Textarea value={form.description_id} onChange={(e) => setForm({...form, description_id: e.target.value})} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e1919] mb-1">Description (English)</label>
                <Textarea value={form.description_en} onChange={(e) => setForm({...form, description_en: e.target.value})} rows={2} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-[#1e1919] flex-1">
                  {editing
                    ? (language === 'id' ? 'Simpan' : 'Save')
                    : (language === 'id' ? 'Tambah' : 'Add')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;