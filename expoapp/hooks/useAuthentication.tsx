import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const useAuthentication = () => {
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const router = useRouter();
  const fetchLoggedInUser = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem("loginuser");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting logged-in user", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchLoggedInUser();
      setLoggedInUser(user);
    };
    loadUser();
  }, [fetchLoggedInUser]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem("loginuser", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error during login", error);
      return null;
    }
  };

  const register = async (user: any) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, user);
      return data;
    } catch (error) {
      console.error("Error during registration", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setLoggedInUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const isDriver = loggedInUser?.userRole === "DRIVER";
  const isPassenger = loggedInUser?.userRole === "PASSENGER";
  const isLoggedIn = !!loggedInUser?.token;

  return { login, register, logout, isLoggedIn, isPassenger, isDriver };
};
