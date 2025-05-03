import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  adminId: string;
}

interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
};

// 🔄 Fetch all customers
export const getCustomers = createAsyncThunk('customers/fetch', async () => {
  const response = await api.get('/customers');
  return response.data;
});

// ✏️ Update customer
export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: string; data: Partial<Customer> }) => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  }
);

// ❌ Delete customer
export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (customerId: string) => {
    await api.delete(`/customers/${customerId}`);
    return customerId;
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch customers';
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex(c => c._id === updated._id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c._id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
