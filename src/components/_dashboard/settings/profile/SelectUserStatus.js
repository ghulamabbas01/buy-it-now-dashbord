import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as api from "src/services";
import toast from 'react-hot-toast';
export default function SelectUserStatus({ user }) {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(api.userStatus, {
    onSuccess: () => {
      toast.success("Status Updated");
      navigate("/users");
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
      mutate({ id: user?._id, status: props });
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
        endIcon={<ExpandMoreRoundedIcon sx={{ fontSize: 16 }} />}
        sx={{ ml: 1 }}
        loading={isLoading}
        loadingPosition="end"
      >
        {selected ? selected : user?.status}
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
        {["active", "block"].map((status) => (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            key={status}
            onClick={() => handleClose(status)}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
