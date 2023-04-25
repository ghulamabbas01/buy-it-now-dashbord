import React from "react";
import { Outlet } from "react-router-dom";
import NoInternet from "src/pages/noInternet";
export default function AuthLayout() {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    window.navigator.onLine ? setIsOnline(true) : setIsOnline(false);
  }, []);
  // [window.navigator.onLine]
  if (!isOnline) {
    return <NoInternet />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
