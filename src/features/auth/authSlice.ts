import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean; // ✅ new
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false, // ✅
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data as User;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', credentials);
    return response.data as User;
  }
);

export const getCurrentUser = createAsyncThunk('auth/me', async () => {
  const response = await api.get('/auth/me');
  return response.data as User;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;

      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
        state.initialized = true; 

      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
