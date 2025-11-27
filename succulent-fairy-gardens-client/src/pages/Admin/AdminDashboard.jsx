import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinkClass = ({ isActive }) => 
    `block p-3 text-gray-700 hover:bg-primary/10 rounded-lg transition-colors ${isActive ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-[250px] bg-bg-soft p-6 min-h-[50vh] md:min-h-[80vh] rounded-2xl h-fit">
        <h3 className="text-2xl mb-4">Admin Menu</h3>
        <ul className="list-none space-y-2 mb-8">
          <li>
            <NavLink to="/admin/orders" className={navLinkClass}>Orders</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={navLinkClass}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={navLinkClass}>Settings</NavLink>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-danger w-full justify-center">
          Logout
        </button>
      </aside>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<AdminOrders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;