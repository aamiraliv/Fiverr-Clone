import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "../redux/AuthSlice/authSlice";


const useAutoRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAccessToken());
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useAutoRefreshToken;