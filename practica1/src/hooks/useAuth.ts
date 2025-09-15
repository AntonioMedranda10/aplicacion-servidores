import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { mockUser } from '../data/mockData';

const STORAGE_KEY = 'reservaManta_auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de sesión desde localStorage
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      const parsedAuth: AuthState = JSON.parse(savedAuth);
      setAuthState(parsedAuth);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulación simple: cualquier email válido con password > 6 chars
    if (email.includes('@') && password.length >= 6) {
      const loggedUser: User = {
        ...mockUser,
        email,
        isLoggedIn: true
      };

      const newAuthState: AuthState = {
        user: loggedUser,
        isLoggedIn: true
      };

      setAuthState(newAuthState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Validaciones básicas
    if (name.length < 2 || !email.includes('@') || password.length < 6) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      isLoggedIn: true
    };

    const newAuthState: AuthState = {
      user: newUser,
      isLoggedIn: true
    };

    setAuthState(newAuthState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isLoggedIn: false });
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (authState.user) {
      const newUser = { ...authState.user, ...updatedUser };
      const newAuthState: AuthState = {
        user: newUser,
        isLoggedIn: true
      };
      
      setAuthState(newAuthState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    isLoading
  };
};