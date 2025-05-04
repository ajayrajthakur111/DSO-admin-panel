import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getCurrentUser } from '../features/auth/authSlice';
import { getCustomers } from '../features/customers/customerSlice';

export const useAuthInit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const initialized = useSelector((state: RootState) => state.auth.initialized);

    useEffect(() => {
        if (!initialized) {
            dispatch(getCurrentUser()).unwrap().then(() => {
                dispatch(getCustomers());
            });
        }
    }, [initialized, dispatch]);
};
