import React from 'react';
import '../styles/EditCustomerModal.css';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<Props> = ({ open, onConfirm, onCancel, message }) => {
  if (!open) return null;

  return (
    <div className="glass-modal-backdrop">
      <div className="glass-modal">
        <h2>Confirmation</h2>
        <p style={{ marginBottom: '1.5rem' }}>{message}</p>
        <div className="glass-actions">
          <button className="glass-btn cancel" onClick={onCancel}>Cancel</button>
          <button className="glass-btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
