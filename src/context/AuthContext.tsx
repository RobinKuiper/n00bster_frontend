import React, { createContext, useEffect, useState } from 'react';
import {register} from "../services/AuthService";

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

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(jwt) return;

    console.log("Check Auth.");
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      setJwt(storedJwt);
      setIsLoggedIn(true);
    }else{
      register({ visitor: true })
        .then(response => {
          login(response.jwt)
        })
        .catch(error => console.log(error));
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
