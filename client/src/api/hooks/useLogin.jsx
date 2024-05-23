import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AxiosClient from "../axios/AxiosClient";
export default function useLogin() {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);

    try {
      //try to sign up
      const response = await AxiosClient.post("/login", {
        username,
        password,
      });
      //update auth context
      dispatch({ type: "LOGIN", payload: response.data.user });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return { login, isLoading, error };
}
