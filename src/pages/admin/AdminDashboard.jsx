import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Plus, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/ui/button';
import { getApiUrl } from '../../config';

const AdminDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, recentOrders: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(getApiUrl('/api/stats'));
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <p className="text-[#736c64] mb-8">
        {language === 'id' ? 'Selamat datang di panel admin Semesta Souvenir' : 'Welcome to Semesta Souvenir admin panel'}
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-[#61525a]" />
          </div>
          <p className="text-[#736c64] text-sm">{language === 'id' ? 'Total Produk' : 'Total Products'}</p>
          <p className="text-3xl font-bold text-[#1e1919] mt-1">
            {loading ? '-' : stats.totalProducts}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center mb-4">
            <ShoppingCart className="w-6 h-6 text-[#61525a]" />
          </div>
          <p className="text-[#736c64] text-sm">{language === 'id' ? 'Total Pemesanan' : 'Total Orders'}</p>
          <p className="text-3xl font-bold text-[#1e1919] mt-1">
            {loading ? '-' : stats.totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-[#61525a]" />
          </div>
          <p className="text-[#736c64] text-sm">{language === 'id' ? 'Pemesanan Baru' : 'New Orders'}</p>
          <p className="text-3xl font-bold text-[#1e1919] mt-1">
            {loading ? '-' : stats.recentOrders.filter(o => o.status === 'Baru').length}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#1e1919]">
            {language === 'id' ? 'Pemesanan Terbaru' : 'Recent Orders'}
          </h2>
          <Button className="bg-[#1e1919] text-sm" onClick={() => navigate('/admin/orders')}>
            {language === 'id' ? 'Lihat Semua' : 'View All'}
          </Button>
        </div>
        {loading ? (
          <p className="text-[#736c64]">{language === 'id' ? 'Memuat...' : 'Loading...'}</p>
        ) : stats.recentOrders.length === 0 ? (
          <p className="text-[#736c64]">{language === 'id' ? 'Belum ada pemesanan' : 'No orders yet'}</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f7f5f2]">
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Nama' : 'Name'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Produk' : 'Product'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Status' : 'Status'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Tanggal' : 'Date'}</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#f7f5f2] last:border-0 hover:bg-[#f7f5f2] transition-colors">
                    <td className="p-4 text-[#1e1919] font-medium">{order.name}</td>
                    <td className="p-4 text-[#736c64]">{order.product || '-'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Baru' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#736c64] text-sm">
                      {new Date(order.created_at).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#1e1919] mb-4">
          {language === 'id' ? 'Aksi Cepat' : 'Quick Actions'}
        </h2>
        <div className="flex gap-4">
          <Button className="bg-[#1e1919]" onClick={() => navigate('/admin/products')}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'id' ? 'Kelola Produk' : 'Manage Products'}
          </Button>
          <Button className="bg-[#61525a]" onClick={() => navigate('/admin/orders')}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {language === 'id' ? 'Lihat Pemesanan' : 'View Orders'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;