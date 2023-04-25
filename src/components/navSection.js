import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  isShow: PropTypes.bool,
  item: PropTypes.object,
};

function NavItem({ item, isShow, onClose, t }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = path
    ? !!matchPath({ path, end: false }, pathname)
    : false;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
    if (!children) {
      onClose();
    }
  };
  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
    svg: {
      transform: (theme) =>
        theme.direction === "rtl" ? "rotate(180deg)" : "rotate(90deg)",
    },
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={t(title)} />
              {info && info}
              {open ? (
                <ArrowForwardIosRoundedIcon
                  sx={{
                    width: 16,
                    height: 16,
                    ml: 1,
                    transform: "rotate(90deg)",
                  }}
                />
              ) : (
                <ArrowForwardIosRoundedIcon
                  sx={{
                    width: 16,
                    height: 16,
                    ml: 1,
                    transform: (theme) =>
                      theme.direction === "rtl"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
              )}
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children?.map((item) => {
                const { title, path } = item;
                const isActiveSub = path
                  ? !!matchPath({ path, end: false }, pathname)
                  : false;

                return (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={t(title)} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      onClick={() => onClose()}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={t(title)} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
};

export default function NavSection({
  navConfig,
  onClose,
  isShow = true,
  ...other
}) {
  const { t } = useTranslation("common");
  return (
    <Box {...other}>
      <List key={Math.random()} disablePadding>
        <ListSubheaderStyle />
        {navConfig?.map((item) => (
          <React.Fragment key={item.title}>
            <NavItem item={item} isShow={isShow} onClose={onClose} t={t} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
