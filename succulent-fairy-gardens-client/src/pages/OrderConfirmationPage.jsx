import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="bg-bg-soft p-10 rounded-2xl text-center">
      <h2 className="text-3xl mb-4">Thank You, {order.customer.name}!</h2>
      <p>Your order has been received. Please make an EFT payment to complete your purchase.</p>
      <p className="mt-4">
        <strong>Your Order Number: {order._id}</strong>
      </p>

      {loading || !settings ? (
        <p>Loading payment details...</p>
      ) : (
        <div className="bg-white border-2 border-dashed border-primary p-8 rounded-2xl mt-8 text-left max-w-xl mx-auto">
          <h3 className="text-center text-2xl mb-6">Payment Instructions (EFT)</h3>
          <p className="text-center mb-4">
            Please use your <strong>Order Number</strong> as the payment reference.
          </p>
          <ul className="list-none">
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Bank:</strong> {settings.bankName}
            </li>
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Account Holder:</strong> {settings.accountHolder}
            </li>
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Account Number:</strong> {settings.accountNumber}
            </li>
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Branch Code:</strong> {settings.branchCode}
            </li>
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Amount:</strong> R{order.totalPrice.toFixed(2)}
            </li>
            <li className="text-lg mb-3">
              <strong className="inline-block w-[150px] text-secondary">Reference:</strong> {order._id}
            </li>
          </ul>
        </div>
      )}
      
      <div className="bg-bg-soft p-8 rounded-2xl border border-primary mt-8 text-left max-w-xl mx-auto">
        <h3 className="text-2xl mb-4">Order Summary</h3>
        {order.orderItems.map((item) => (
          <div key={item.product} className="flex justify-between mb-2">
            <span>{item.name} (x{item.qty})</span>
            <span>R{(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-4 border-primary" />
        <p className="flex justify-between mb-2"><span>Subtotal:</span> <span>R{order.itemsPrice.toFixed(2)}</span></p>
        <p className="flex justify-between mb-2"><span>Shipping:</span> <span>R{order.shippingPrice.toFixed(2)}</span></p>
        <p className="flex justify-between font-bold text-xl mt-4 border-t-2 border-primary pt-4"><strong>Total:</strong> <span>R{order.totalPrice.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;