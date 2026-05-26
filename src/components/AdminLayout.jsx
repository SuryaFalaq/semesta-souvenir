import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Folder, ShoppingCart, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AdminLayout = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: language === 'id' ? 'Dashboard' : 'Dashboard' },
    { path: '/admin/products', icon: Package, label: language === 'id' ? 'Produk' : 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: language === 'id' ? 'Pemesanan' : 'Orders' },
    { path: '/admin/categories', icon: Folder, label: language === 'id' ? 'Kategori' : 'Categories' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin') {
      return language === 'id' ? 'Dashboard Admin' : 'Admin Dashboard';
    }
    if (location.pathname === '/admin/products') {
      return language === 'id' ? 'Kelola Produk' : 'Manage Products';
    }
    if (location.pathname === '/admin/orders') {
      return language === 'id' ? 'Kelola Pemesanan' : 'Manage Orders';
    }
    if (location.pathname === '/admin/categories') {
      return language === 'id' ? 'Kelola Kategori' : 'Manage Categories';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex">
      <aside className="w-64 bg-[#1e1919] text-white fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold">Semesta Admin</h2>
          <p className="text-xs text-[#bbb5ae]">Management Panel</p>
        </div>
        <nav className="px-4 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname === item.path ? 'bg-[#61525a]' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{language === 'id' ? 'Keluar' : 'Logout'}</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 ml-64">
        <div className="pt-8 px-8">
          <h1 className="text-3xl font-bold text-[#1e1919] mb-6">{getPageTitle()}</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;