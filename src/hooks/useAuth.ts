
import { useState, useEffect } from 'react';

// Simulierter Auth-Zustand (später durch echte Auth ersetzt)
export interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  // Überprüft localStorage für den Authentifizierungsstatus
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Einfache Simulation des Auth-Status-Ladens
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simulierte Anmeldung (später durch echte Auth ersetzt)
      if (email && password) {
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email
        };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser(newUser);
        resolve(newUser);
      } else {
        reject(new Error('Ungültige Anmeldedaten'));
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
