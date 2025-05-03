import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getCurrentUser } from '../features/auth/authSlice';
import { getCustomers } from '../features/customers/customerSlice';

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCustomers());
  }, [dispatch]);
};
