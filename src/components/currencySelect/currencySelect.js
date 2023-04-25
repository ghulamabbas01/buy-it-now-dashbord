import * as React from "react";
import data from "./data.json";
import { MenuPopover } from "src/components";
import { MenuItem, Typography, Divider, Box, IconButton } from "@mui/material";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import { useMutation, useQuery } from "react-query";
import * as api from "src/services";
import toast from 'react-hot-toast';
import useAuth from "src/hooks/useAuth";
export default function CountrySelect() {
  const { countries } = data;
  const { onChangeCurrency, currency } = useAuth();
  const [count, setCount] = React.useState(0);
  const { data: user } = useQuery(["get profile", count], api.getProfile);
  const anchorRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation(api.updateProfile, {
    onSuccess: () => {
      setCount(count + 1);
      toast.success("Changed currency!");
    },
  });
  React.useEffect(() => {
    if (user) {
      onChangeCurrency(user?.data.currency.toLowerCase());
    }
  }, [user]);
  
  return (
    <>
      <IconButton ref={anchorRef} onClick={handleOpen}>
        <MonetizationOnRoundedIcon />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          width: 200,
        }}
      >
        <Typography variant="h6" color="text.primary" px={2} py={1}>
          Currencies
        </Typography>
        <Divider />
        <Box sx={{ height: 400, overflow: "auto" }}>
          {countries.map((v) => (
            <MenuItem
              sx={{
                bgcolor: (theme) =>
                  user?.data.currency.toLowerCase() ===
                  v.currencyCode.toLowerCase()
                    ? theme.palette.background.neutral
                    : theme.palette.background.paper,
                fontWeight: 500,
              }}
              onClick={() => {
                handleClose();
                mutate({ currency: v.currencyCode.toLowerCase() });
              }}
            >
              <Box
                component="img"
                loading="lazy"
                width="16"
                src={`https://flagcdn.com/w20/${v.countryCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${v.countryCode.toLowerCase()}.png 2x`}
                alt=""
                sx={{ mr: 1 }}
              />{" "}
              {v.currencyCode}{" "}
              {user?.data.currency.toLowerCase() ===
              v.currencyCode.toLowerCase() ? (
                <RadioButtonCheckedRoundedIcon
                  fontSize="small"
                  sx={{ ml: "auto" }}
                />
              ) : null}
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
