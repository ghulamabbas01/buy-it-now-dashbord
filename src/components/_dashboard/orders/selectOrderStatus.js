import * as React from "react";
// material
import { Menu, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
// notification
import toast from 'react-hot-toast';
export default function SelectOrderStatus({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation("order");
  const { mutate, isLoading } = useMutation(api.updateOrderStatus, {
    onSuccess: () => {
      toast.success("Order Status Updated");
      navigate("/orders");
    },
    onError: () => {
      toast.error("Something Is Wrong!");
    },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (props) => {
    setSelected(props);
    if (props !== selected) {
      mutate({ id: data?._id, status: props });
    }
    setAnchorEl(null);
  };

  return (
    <>
      <LoadingButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={<ExpandMoreRoundedIcon />}
        sx={{ ml: 1 }}
        loading={isLoading || !data}
        loadingPosition="end"
      >
        {selected ? selected : t(data?.status) || "Loading"}
      </LoadingButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(selected)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {["pending", "ontheway", "delivered", "returned", "cancelled"].map(
          (status) => (
            <MenuItem
              sx={{ textTransform: "capitalize" }}
              key={status}
              onClick={() => handleClose(status)}
            >
              {t(status)}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}
