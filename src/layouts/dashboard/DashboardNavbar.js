import React from "react";
import PropTypes from "prop-types";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import ThemeMode from "./ThemeMode";
import { Search, MHidden, LanguageSelect } from "src/components";
import sidebarConfig from "./config";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 180;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 60;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 1),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const [open, setopen] = React.useState(false);
  const pathname = window.location.pathname;
  const filtered = sidebarConfig.filter((v) => v.path === pathname);
  const isActive =
    filtered.length > 0
      ? filtered
      : sidebarConfig.filter(
          (v) =>
            v.children && v.children?.find((child) => child.path === pathname)
        );
  const isSearch = Boolean(isActive[0]?.isSearch);
  React.useEffect(() => {
    setopen(true);
  }, []);

  return (
    <RootStyle
      sx={{
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </MHidden>

        {Boolean(isSearch) && <Search />}

        <Box sx={{ flexGrow: 1 }} />
        {open && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1 }}
          >
            <LanguageSelect />
            <NotificationsPopover />
            <ThemeMode />
            {/* <CurrencySelect /> */}
            <AccountPopover />
          </Stack>
        )}
      </ToolbarStyle>
    </RootStyle>
  );
}
