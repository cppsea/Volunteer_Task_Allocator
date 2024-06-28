import { useAuthContext } from "./useAuthContext";
import AxiosClient from "../axios/AxiosClient";

export default function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('user');
    await AxiosClient.post("/logout");
    
  };

  return { logout };
};
