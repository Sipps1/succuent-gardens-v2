import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, FileText, CreditCard, Home } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const order = state?.order;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/admin/settings');
        setSettings(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white rounded-2xl min-h-[60vh] p-8 md:p-12 relative shadow-soft border border-white/50 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-float">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-4xl font-heading text-primary mb-2 text-shadow-custom">
          Thank You, {order.customer.name}!
        </h2>
        <p className="text-xl text-gray-500">
          Your magical order has been received.
        </p>
        <div className="inline-block bg-[#FDF6F6] px-6 py-2 rounded-full mt-4 border border-[#E8D5D5]">
          <span className="text-gray-600">Order Number:</span> <strong className="text-primary">{order._id}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Instructions */}
        {loading || !settings ? (
          <p className="text-center col-span-full">Loading payment details...</p>
        ) : (
          <div className="bg-[#FDF6F6] border-2 border-dashed border-[#D4A5A5] p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D4A5A5] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              EFT REQUIRED
            </div>
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Instructions
            </h3>
            <p className="text-sm text-gray-600 mb-6 italic">
              Please use your Order Number as the payment reference.
            </p>
            
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Bank</span>
                <span className="font-bold text-gray-700">{settings.bankName}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Account Holder</span>
                <span className="font-bold text-gray-700">{settings.accountHolder}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Account Number</span>
                <span className="font-bold text-gray-700">{settings.accountNumber}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Branch Code</span>
                <span className="font-bold text-gray-700">{settings.branchCode}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-primary text-lg">R{order.totalPrice.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        )}
        
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-[#E8D5D5]">
          <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Order Details
          </h3>
          
          <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                <span className="font-medium text-gray-700">R{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <p className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>R{order.itemsPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>R{order.shippingPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-lg text-primary mt-4 pt-4 border-t-2 border-dotted border-[#E8D5D5]">
              <span>Total</span>
              <span>R{order.totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link to="/" className="btn btn-secondary inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;