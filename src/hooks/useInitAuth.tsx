import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken, setUserName } from "@/store/features/authSlice";

export default function useInitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = localStorage.getItem("userName") || ""
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (accessToken && refreshToken) {
      dispatch(setAccessToken(accessToken))
      dispatch(setRefreshToken(refreshToken))
      dispatch(setUserName(userName))
    }
  }, [dispatch])
}
