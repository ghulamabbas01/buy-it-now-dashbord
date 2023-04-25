import React from "react";
// material
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { LoadingButton } from "@mui/lab";
import toast from 'react-hot-toast';
import { useMutation } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";

export default function DeleteDialog({ onClose, id, apicall, endPoint, type }) {
  const { t } = useTranslation("common");
  const { isLoading, mutate } = useMutation(api[endPoint], {
    onSuccess: () => {
      toast.success(`${type} Deleted`);
      apicall((prev) => ({ ...prev, apicall: !prev.apicall }));
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <>
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
        <WarningRoundedIcon sx={{ mr: 1 }} /> {t("warning")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("are-you-sure-you-want-to-delete-this-category?")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={handleDelete}
        >
          {t("delete")}
        </LoadingButton>
      </DialogActions>
    </>
  );
}
