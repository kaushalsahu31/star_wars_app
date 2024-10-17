import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';


const fakeUser = {
  username: 'user',
  password: 'password',
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (username: string, password: string) => {
    if (username === fakeUser.username && password === fakeUser.password) {
      const fakeToken = 'fake-jwt-token';
      setToken(fakeToken);
      localStorage.setItem('token', fakeToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!token;

  const getDecodedToken = () => (token ? jwtDecode(token) : null);

  return { login, logout, isAuthenticated,getDecodedToken };
};
