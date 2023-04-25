import React from "react";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as api from "src/services";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { t } = useTranslation("setting");
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t("old-password-is-required")),
    newPassword: Yup.string()
      .min(6, t("password-must-be-at-least-6-characters"))
      .required(t("new-password-is-required")),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      t("passwords-must-match")
    ),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values) => {
      const data = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      };
      mutate(data);
    },
  });

  const { mutate, isLoading: loading } = useMutation(api.changePassword, {
    onSuccess: ({ data }) => {
      formik.resetForm();
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong!");
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps("oldPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label={t("old-password")}
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />
            <TextField
              {...getFieldProps("newPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label={t("new-password")}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) ||
                t("password-must-be-minimum-6+")
              }
            />

            <TextField
              {...getFieldProps("confirmNewPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label={t("confirm-new-password")}
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
            />

            <LoadingButton type="submit" variant="contained" loading={loading}>
              {t("save-changes")}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
