import { useAuthContext } from "./useAuthContext";
import AxiosClient from "../axios/AxiosClient";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });

    await AxiosClient.post("/logout");
  };

  return { logout };
};
