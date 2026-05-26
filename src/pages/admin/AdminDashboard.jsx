import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/ui/button';

const AdminDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#1e1919] mb-2">
        {language === 'id' ? 'Dashboard Admin' : 'Admin Dashboard'}
      </h1>
      <p className="text-[#736c64] mb-8">
        {language === 'id' ? 'Selamat datang di panel admin Semesta Souvenir' : 'Welcome to Semesta Souvenir admin panel'}
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-[#61525a]" />
          </div>
          <p className="text-[#736c64] text-sm">{language === 'id' ? 'Total Produk' : 'Total Products'}</p>
          <p className="text-3xl font-bold text-[#1e1919] mt-1">4</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-[#1e1919] mb-4">
          {language === 'id' ? 'Aksi Cepat' : 'Quick Actions'}
        </h2>
        <div className="flex gap-4">
          <Button className="bg-[#1e1919]" onClick={() => navigate('/admin/products')}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'id' ? 'Kelola Produk' : 'Manage Products'}
          </Button>
          <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            {language === 'id' ? 'Keluar' : 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;