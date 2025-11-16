import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { checkAuth } from './store/slices/authSlice';

// Layout
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/Forms/FormBuilder';
import FormList from './pages/Forms/FormList';
import FormView from './pages/Forms/FormView';
import Marketplace from './pages/Marketplace';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import AdminPanel from './pages/Admin';

// Components
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:id" element={<FormView />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes - Require Authentication */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forms/new" element={<FormBuilder />} />
        <Route path="/forms/:id/edit" element={<FormBuilder />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
