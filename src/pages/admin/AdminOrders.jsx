import React, { useEffect, useState } from 'react';
import { Eye, Trash2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getApiUrl } from '../../config';

const statusColors = {
  'Baru': 'bg-blue-100 text-blue-700',
  'Diproses': 'bg-yellow-100 text-yellow-700',
  'Selesai': 'bg-green-100 text-green-700',
  'Batal': 'bg-red-100 text-red-700',
};

const AdminOrders = () => {
  const { language } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(getApiUrl('/api/contact'));
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(getApiUrl(`/api/contact/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map(o => o.id === id ? updated : o));
        if (selectedOrder?.id === id) setSelectedOrder(updated);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(language === 'id' ? 'Hapus pesanan ini?' : 'Delete this order?')) return;
    try {
      const res = await fetch(getApiUrl(`/api/contact/${id}`), { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
        if (selectedOrder?.id === id) setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  return (
    <div>
      <p className="text-[#736c64] mb-8">
        {language === 'id' ? 'Daftar pemesanan dari pelanggan' : 'List of customer orders'}
      </p>

      {loading ? (
        <p className="text-[#736c64]">{language === 'id' ? 'Memuat...' : 'Loading...'}</p>
      ) : orders.length === 0 ? (
        <p className="text-[#736c64]">{language === 'id' ? 'Belum ada pemesanan' : 'No orders yet'}</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f7f5f2] bg-[#f7f5f2]">
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">ID</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Nama' : 'Name'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Email' : 'Email'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Produk' : 'Product'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Jumlah' : 'Qty'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Status' : 'Status'}</th>
                  <th className="text-left p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Tanggal' : 'Date'}</th>
                  <th className="text-right p-4 text-[#736c64] text-sm font-medium">{language === 'id' ? 'Aksi' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#f7f5f2] last:border-0 hover:bg-[#f7f5f2] transition-colors">
                    <td className="p-4 text-[#736c64] text-sm">#{order.id}</td>
                    <td className="p-4 text-[#1e1919] font-medium">{order.name}</td>
                    <td className="p-4 text-[#736c64] text-sm">{order.email}</td>
                    <td className="p-4 text-[#736c64]">{order.product || '-'}</td>
                    <td className="p-4 text-[#736c64]">{order.quantity || '-'}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}
                      >
                        <option value="Baru">Baru</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Batal">Batal</option>
                      </select>
                    </td>
                    <td className="p-4 text-[#736c64] text-sm">
                      {new Date(order.created_at).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-[#f7f5f2] rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-[#61525a]" />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1e1919]">
                {language === 'id' ? 'Detail Pemesanan' : 'Order Detail'} #{selectedOrder.id}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-[#f7f5f2] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#736c64]">{language === 'id' ? 'Nama' : 'Name'}</p>
                  <p className="font-medium text-[#1e1919]">{selectedOrder.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#736c64]">Email</p>
                  <p className="font-medium text-[#1e1919]">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#736c64]">{language === 'id' ? 'Telepon' : 'Phone'}</p>
                  <p className="font-medium text-[#1e1919]">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#736c64]">{language === 'id' ? 'Produk' : 'Product'}</p>
                  <p className="font-medium text-[#1e1919]">{selectedOrder.product || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#736c64]">{language === 'id' ? 'Jumlah' : 'Quantity'}</p>
                  <p className="font-medium text-[#1e1919]">{selectedOrder.quantity || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#736c64]">{language === 'id' ? 'Status' : 'Status'}</p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[selectedOrder.status] || 'bg-gray-100 text-gray-700'}`}
                  >
                    <option value="Baru">Baru</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Batal">Batal</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#736c64] mb-1">{language === 'id' ? 'Deskripsi Pesanan' : 'Order Description'}</p>
                <div className="bg-[#f7f5f2] rounded-xl p-4">
                  <p className="text-[#1e1919] whitespace-pre-wrap">{selectedOrder.message || '-'}</p>
                </div>
              </div>
              <p className="text-xs text-[#736c64]">
                {new Date(selectedOrder.created_at).toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;