import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { deviceTypeStore } from "./store/deviceTypeStore";
import { useAuthStore } from "./store/authStore";
import { useSocketStore } from "./store/socketStore";

function App() {
  const { osType, browserType, platformType } = deviceTypeStore();
  const { accessToken, isLoggedIn } = useAuthStore();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      connect(accessToken);
    } else {
      disconnect();
    }
    
    // We don't necessarily want to disconnect on unmount of App 
    // unless the app is actually closing, but it's good practice.
    return () => {
      // disconnect(); 
    };
  }, [isLoggedIn, accessToken, connect, disconnect]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
