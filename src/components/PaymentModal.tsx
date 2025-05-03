/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import '../styles/PaymentModal.css'; // glassmorphism styles
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<Props> = ({ open, onClose }) => {
  const [amount, setAmount] = useState('');

  const handlePay = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    try {
      const res = await api.post('/payment/create-order', {
        amount: parseInt(amount), // Convert ₹ to paise
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: 'INR',
        name: 'Admin Panel Payment',
        description: 'Custom Amount Payment',
        order_id: res.data.id,
        handler: function (response: any) {
          toast.success('Payment successful!');
          console.log('Payment success:', response);
          onClose();
        },
        prefill: {
          name: 'Admin',
          email: 'admin@example.com',
        },
        theme: {
          color: '#8e44ad',
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error('Failed to initiate payment');
      console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div className="glass-modal-backdrop">
      <div className="glass-modal">
        <h2>Enter Amount</h2>
        <input
          type="number"
          placeholder="Enter amount (in ₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="glass-actions">
          <button className="glass-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="glass-btn primary" onClick={handlePay}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
