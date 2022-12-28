import { PageProps } from 'gatsby';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextData {
  jwt: string | null;
  isLoggedIn: boolean;
  login: (jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  jwt: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

interface Props extends PageProps {}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      setJwt(storedJwt);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newJwt: string) => {
    setJwt(newJwt);
    localStorage.setItem('jwt', newJwt);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setJwt(null);
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ jwt, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
