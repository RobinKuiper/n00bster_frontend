import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";

interface AuthContextData {
  jwt: string | null;
  isLoggedIn: boolean;
  userId: number;
  displayName: string;
  login: (jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  jwt: null,
  isLoggedIn: false,
  userId: -1,
  displayName: "",
  login: () => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number>(-1);
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if(jwt) return;

    console.log("Check Auth.");
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      login(storedJwt);
    }
    // else{
    //   register({ visitor: true })
    //     .then(response => {
    //       login(response.jwt)
    //     })
    //     .catch(error => console.log(error));
    // }
  }, []);

  const login = (newJwt: string) => {
    setJwt(newJwt);
    localStorage.setItem('jwt', newJwt);
    setIsLoggedIn(true);
    let decoded: { userId: number, displayName: string } = jwtDecode(newJwt);
    setUserId(decoded.userId)
    setDisplayName(decoded.displayName)
  };

  const logout = () => {
    setJwt(null);
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ jwt, isLoggedIn, userId, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
