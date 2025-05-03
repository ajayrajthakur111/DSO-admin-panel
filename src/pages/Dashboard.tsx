import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import PaymentModal from "../components/PaymentModal";
import {
  getCustomers,
  deleteCustomer,
  updateCustomer,
  Customer,
} from "../features/customers/customerSlice";
import EditCustomerModal from "../components/EditCustomerModal";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: customers,
    loading,
    error,
  } = useSelector((state: RootState) => state.customers);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    if (confirmDeleteId) {
      dispatch(deleteCustomer(confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const handleSaveEdit = async (updated: Partial<Customer>) => {
    if (!updated._id) return;
    await dispatch(updateCustomer({ id: updated._id, data: updated }));
    setEditingCustomer(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">👥 Customer List</h2>

      {loading && <p className="dashboard-loading">Loading customers...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && customers.length === 0 && (
        <p className="dashboard-empty">No customers found.</p>
      )}

      <div className="customer-table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone || "-"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      customer.status === "active" ? "active" : "inactive"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => setConfirmDeleteId(customer._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="pay-btn"
                    onClick={() => setShowPayment(true)}
                  >
                    Collect Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditCustomerModal
        open={!!editingCustomer}
        customer={editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        open={!!confirmDeleteId}
        message="Are you sure you want to delete this customer?"
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
      <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} />

    </div>
  );
};

export default Dashboard;
