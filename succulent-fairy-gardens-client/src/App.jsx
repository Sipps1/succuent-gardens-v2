import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        {/* Removed global container constraints to allow full-width backgrounds */}
        <main className="relative z-10 flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* You may want to add 'container mx-auto px-4' to these individual pages 
                if you want them centered, now that the global constraint is gone. */}
            <Route path="/shop" element={<div className="container mx-auto px-4"><ShopPage /></div>} />
            <Route path="/cart" element={<div className="container mx-auto px-4"><CartPage /></div>} />
            <Route path="/checkout" element={<div className="container mx-auto px-4"><CheckoutPage /></div>} />
            <Route
              path="/order-confirmation"
              element={<div className="container mx-auto px-4"><OrderConfirmationPage /></div>}
            />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<div className="container mx-auto px-4"><AdminLogin /></div>} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <div className="container mx-auto px-4">
                    <AdminDashboard />
                  </div>
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;