import { useState } from "react";
import AxiosClient from "../axios/AxiosClient";
export const useSignup = () => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async ({
    email,
    username,
    password,
    first_name,
    last_name,
  }) => {
    setIsLoading(true);
    setErrors(null);

    try {
      //try to sign up
      const response = await AxiosClient.post("/register", {
        email,
        username,
        password,
        first_name,
        last_name,
      });

      //we are not updating auth context because we want them to log in
      setIsLoading(false);
    } catch (error) {
      //if there is response with error
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  };

  return { signup, isLoading, errors };
};
