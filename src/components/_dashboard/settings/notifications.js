import React from "react";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  Card,
  Grid,
  Typography,
  Divider,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as api from "src/services";
import { useMutation, useQuery } from "react-query";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------
export default function AccountChangePassword() {
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const { t } = useTranslation("setting");
  const { data, isLoading } = useQuery(
    ["userNotification", count],
    api.getUserNotification,
    {
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      },
    }
  );
  const [mode, setMode] = React.useState("add");
  const ChangePassWordSchema = Yup.object().shape({
    title: Yup.string().required(t("title-is-require")),
    description: Yup.string().required(t("description-is-required")),
  });

  const handleClickOpen = (prop) => {
    setId(prop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      link: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  const { mutate, isLoading: editLoading } = useMutation(
    mode === "add" ? api.addUserNotification : api.editUserNotification,
    {
      onSuccess: ({ data }) => {
        formik.resetForm();
        setCount(count + 1);
        setMode("add");
        toast.success("success",);
      },
      onError: (err) => {
        const message = JSON.stringify(err.response.data.message);
        toast.error(JSON.parse(message));
      },
    }
  );

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
    api.deleteUserNotification,
    {
      onSuccess: () => {
        formik.resetForm();
        setCount(count + 1);
        setMode("add");
        setId("");
        toast.success("Deleted");
      },
      onError: (err) => {
        const message = JSON.stringify(err.response.data.message);
        toast.error(JSON.parse(message));
      },
    }
  );

  const { errors, touched, handleSubmit, getFieldProps, setValues } = formik;
  const loading = deleteLoading || editLoading || isLoading;
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h4" color="text.primary">
                {mode === "add" ? t("add-notification") : t("update-notification")}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={3} alignItems="flex-end">
                <TextField
                  {...getFieldProps("title")}
                  fullWidth
                  label={t("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  {...getFieldProps("description")}
                  fullWidth
                  label={t("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <TextField {...getFieldProps("link")} fullWidth label={t("link")} />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={editLoading || isLoading}
                >
                  {t("submit")}
                </LoadingButton>
              </Stack>
            </Card>
          </Form>
        </FormikProvider>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
          >
            <WarningRoundedIcon sx={{ mr: 1 }} /> {t("warning")}
          </DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <DialogContentText id="alert-dialog-description">
              {t("are-you-sure-you-want-to-delete-this-category?")}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ pt: 0, pb: 0 }}>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button
              onClick={() => {
                deleteMutate(id);
                handleClose();
              }}
              autoFocus
            >
              {t("delete")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" color="text.primary">
            {t("notifications")}
            <Button
              variant="contained"
              color="primary"
              sx={{ float: "right" }}
              onClick={() => {
                setMode("add");
                setValues({
                  title: "",
                  description: "",
                  link: "",
                });
              }}
            >
              {t("add")}
            </Button>
          </Typography>
          <Divider sx={{ my: 2 }} />
          {!loading && data.notifications.length < 1 && (
            <Typography variant="h6" color="text.secondary">
              {t("no-notification-added-yet!")}
            </Typography>
          )}
          {(loading ? Array.from(new Array(3)) : data.notifications).map(
            (v) => (
              <Box key={Math.random()}>
                <Typography variant="h6" color="text.primary">
                  {loading ? <Skeleton variant="text" /> : v.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {loading ? <Skeleton variant="text" /> : v.description}
                </Typography>

                <Typography
                  variant="body1"
                  color="primary.main"
                  mt={0.8}
                  mb={2}
                  sx={{ textDecoration: loading ? "none" : "underline" }}
                  noWrap
                >
                  {loading ? <Skeleton variant="text" width={100} /> : v.link}
                </Typography>

                <Box textAlign="right" mb={1}>
                  {isLoading ? (
                    <Stack gap={1} direction="row" justifyContent="end">
                      <Skeleton variant="rectangular" width={77} height={30} />
                      <Skeleton variant="rectangular" width={88} height={30} />
                    </Stack>
                  ) : (
                    <>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        aria-label="edit"
                        onClick={() => {
                          setMode("edit");
                          setValues({
                            ...v,
                          });
                        }}
                        endIcon={<EditRoundedIcon />}
                        sx={{ mr: 1 }}
                      >
                        {t("edit")}
                      </Button>
                      <Button
                        color="error"
                        size="small"
                        variant="contained"
                        aria-label="Delete"
                        onClick={() => handleClickOpen(v._id)}
                        endIcon={<ClearRoundedIcon />}
                      >
                        {t("delete")}
                      </Button>
                    </>
                  )}
                </Box>
                <Divider sx={{ mb: 1.5 }} />
              </Box>
            )
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
