import React, { createContext, useState, useContext, useEffect, Component } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('plan2go_user');
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('plan2go_user');
        }
      } else {
        localStorage.removeItem('plan2go_user');
      }
    } catch (err) {
      console.error('Failed to parse stored user:', err);
      localStorage.removeItem('plan2go_user');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('plan2go_token', data.token);

        const profileRes = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const userData = await profileRes.json();

        setUser(userData);
        localStorage.setItem('plan2go_user', JSON.stringify(userData));
        return { success: true };
      }

      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (err) {
      return { success: false, error: 'Server error. Please try again.' };
    }
  };

  const register = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.FirstName,
          last_name: formData.LastName,
          phone: formData.Phone,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('plan2go_token', data.token);
        localStorage.setItem('plan2go_otp', data.otp);


        return { success: true, email: formData.email };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Server error. Please try again.' };
    }
  };

  const verifyOtp = async (otp, email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email }),
      });

      const data = await res.json();

      if (data.success) {
        // Mark user as authenticated after verification
        setUser(data.user);
        localStorage.setItem('plan2go_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'OTP verification failed' };
      }
    } catch (err) {
      return { success: false, error: 'Server error. Please try again.' };
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('plan2go_user');
    localStorage.removeItem('plan2go_token');
  };

  const updateUserProfile = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    localStorage.setItem('plan2go_user', JSON.stringify({ ...user, ...updatedUser }));
  };

  const value = {
    user,
    setUser,
    login,
    register,
    verifyOtp,
    logout,
    loading,
    isAuthenticated: !!user,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};