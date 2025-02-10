"use client";

import {
  IAuthContextType,
  IAuthProviderProps,
} from "@/components/common/interface";
import React, { createContext, useContext, useState, ReactNode } from "react";

const defaultAuthContextValue: IAuthContextType = {
  isAdmin: false,
  toggleAdmin: () => {},
};

const AuthContext = createContext<IAuthContextType>(defaultAuthContextValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
