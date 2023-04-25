import React, { useState } from "react";
// material
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { LoadingButton } from "@mui/lab";
import toast from 'react-hot-toast';
import { useMutation } from "react-query";
import * as api from "src/services";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useNavigate } from "react-router-dom";
export default function DeleteDialog({ id }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoading, mutate } = useMutation(api.userDelete, {
    onSuccess: () => {
      toast.success("User Deleted");
      navigate("/users");
    },
  });
  const handleDelete = () => {
    mutate(id);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        startIcon={<DeleteRoundedIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
          <WarningRoundedIcon sx={{ mr: 1 }} /> Warning
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
