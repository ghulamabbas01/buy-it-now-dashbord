import { useRef, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
// react router dom
import { Link, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  Avatar,
  Button,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
// components
import { MenuPopover } from "src/components";

import { Link as MuiLink } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "src/redux/slices/settings";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "home",
    icon: <HomeRoundedIcon sx={{ mr: 2, width: 24, height: 24 }} />,
    linkTo: "/dashboard",
  },
  {
    label: "profile-setting",
    icon: <Person4RoundedIcon sx={{ mr: 2, width: 24, height: 24 }} />,
    linkTo: "/settings/general",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useTranslation("common");
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.settings);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          alt="My Avatar"
          src={
            user?.cover
              ? user?.cover.url
              : "/static/mock-images/avatars/avatar_default.jpg"
          }
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ textTransform: "capitalize" }}
          >
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS?.map((option) => (
          <MuiLink
            key={option.label}
            to={option.linkTo}
            component={Link}
            sx={{
              color: "text.primary",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              {option.icon}

              {t(option.label)}
            </MenuItem>
          </MuiLink>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(setLogout());
              navigate("/auth/login");
            }}
          >
            {t("logout")}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
