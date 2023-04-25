import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// material
import { styled, useTheme } from "@mui/material/styles";
// hooks
// import useCollapseDrawer from "../../hooks/useCollapseDrawer";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import NoInternet from "src/pages/noInternet";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 90;
const APP_BAR_DESKTOP = 130;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up("sm")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.settings
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/auth/login");
    } else if (isInitialized && window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isInitialized]);
  if (!window.navigator.onLine) {
    return <NoInternet />;
  }
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle
        sx={{
          transition: theme.transitions.create("margin", {
            duration: theme.transitions.duration.complex,
          }),
          mb: 3,
          px: 2,
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
