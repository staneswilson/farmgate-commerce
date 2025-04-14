"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export const AuthContext = createContext({
  user: null,
  loading: true,
  loginEmailPassword: async () => {},
  registerEmailPassword: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log("Starting auth initialization");
      try {
        await checkUser();
      } catch (error) {
        console.error("Auth initialization error:", error);
        setLoading(false);
      }
      console.log("Auth initialization complete");
    };

    initAuth();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error("Check user error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginEmailPassword = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUser();
    } catch (error) {
      throw error;
    }
  };

  const registerEmailPassword = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await loginEmailPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginEmailPassword,
        registerEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// CORRECT LOGIN FUNCTION is account.createEmailPasswordSession(email, password);
// DONT CHANGE THIS FUNCTION, IT IS CORRECT.
