import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// react router do
import toast from 'react-hot-toast';
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useQuery } from "react-query";
import * as api from "src/services";
// material
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";

// components
import { MenuPopover, Scrollbar, MIconButton } from "src/components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ar, enUS } from "date-fns/locale";
import useDirection from "src/hooks/useDirection";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const Notification = ({ item, onClose ,localeDirection}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { locale } = i18n;
  console.log(locale,"language")
  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          navigate(`/orders/${item?.orderId}`);
          onClose();
        }}
        sx={{
          bgcolor: (theme) =>
            theme.palette.background[item?.opened ? "neutral" : "paper"],
        }}
      >
        <ListItemAvatar>
          <Avatar alt={item?.title.slice(3, 4) || ""} src={item?.avatar} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                color="text.primary"
                dangerouslySetInnerHTML={{
                  __html: `${item?.title}`,
                }}
              />

              <Stack direction="row" alignItems="center">
                <AccessTimeRoundedIcon sx={{ fontSize: 14, mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {item && 
                  localeDirection === "rtl"?
                  formatDistanceToNow((item?.createdAt),{locale:locale==="en"? enUS:ar}):
                  formatDistanceToNow((item?.createdAt),{locale:locale==="en"? ar:enUS})
                  }
                </Typography>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider component="li" />
    </>
  );
};

const SkeletonComponent = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography variant="body2" color="text.primary">
                <Skeleton variant="text" />
              </Typography>

              <Stack direction="row" alignItems="center">
                <Skeleton
                  variant="circular"
                  height={14}
                  width={14}
                  sx={{ mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="text" width={140} />
                </Typography>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default function NotificationsPopover() {
  const { t } = useTranslation("common");
  const localeDirection = useDirection();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ["product", page],
    () => api.getNotification(page),
    {
      refetchInterval: 10000,
      onSuccess: (res) => setState(res.notifications),
      onError: (error) =>
      toast.error(error.response.data.message || "Something went wrong!"),
    }
  );
  const totalUnread = state.filter((v) => v.opened === false).length;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <NotificationsRoundedIcon sx={{ fontSize: 20 }} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{t("notifications")}</Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ height: { xs: 340, sm: 400, md: 460 }, overflow: "auto" }}>
          <List disablePadding sx={{ "& .MuiListItemAvatar-root": { mt: 0 } }}>
            {state.map((item) => (
              <Notification
                key={Math.random()}
                isLoading={isLoading}
                localeDirection={localeDirection}
                item={item}
                onClose={() => handleClose()}
              />
            ))}
            {(isLoading ? Array.from(new Array(7)) : []).map((v) => (
              <SkeletonComponent key={Math.random()} />
            ))}
          </List>
          <Box textAlign="center">
            {!isLoading && data.total > 1 && data.total !== page && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ my: 2 }}
                size="small"
                onClick={() => setPage(page + 1)}
              >
                {t('veiw-more')}
              </Button>
            )}
          </Box>
        </Box>
      </MenuPopover>
    </>
  );
}
