import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', backgroundColor: '#f2f2f2' }}>
      <h2>Admin Panel</h2>
      <nav>
        {user ? (
          <>
            <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
