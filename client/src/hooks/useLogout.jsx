import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  //remove user from local storage
  const logout = () => {
    localStorage.removeItem("user");
  };
  dispatch({ type: "LOGOUT" });

  return { logout };
};
