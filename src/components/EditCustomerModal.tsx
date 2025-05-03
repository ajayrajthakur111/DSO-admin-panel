import React, { useEffect, useState } from 'react';
import { Customer } from '../features/customers/customerSlice';
import '../styles/EditCustomerModal.css';

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (updated: Partial<Customer>) => void;
}

const EditCustomerModal: React.FC<Props> = ({ open, customer, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone || '');
      setStatus(customer.status);
    }
  }, [customer]);

  if (!open || !customer) return null;

  return (
    <div className="glass-modal-backdrop">
      <div className="glass-modal">
        <h2>Edit Customer</h2>

        <div className="glass-input-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="glass-input-group">
          <label>Email</label>
          <input value={email} disabled />
        </div>

        <div className="glass-input-group">
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="glass-input-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="glass-actions">
          <button className="glass-btn cancel" onClick={onClose}>Cancel</button>
          <button
            className="glass-btn primary"
            onClick={() => onSave({ _id: customer._id, name, phone, status })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
