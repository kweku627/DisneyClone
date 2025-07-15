import { useState } from 'react';

let isAuthenticated = false;

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);

  const login = () => {
    isAuthenticated = true;
    setLoggedIn(true);
  };

  const logout = () => {
    isAuthenticated = false;
    setLoggedIn(false);
  };

  return { loggedIn, login, logout };
}
