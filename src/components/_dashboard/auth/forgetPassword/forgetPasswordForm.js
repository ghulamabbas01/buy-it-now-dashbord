import { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
// react query
import { useMutation } from "react-query";
// formik
import { Form, FormikProvider, useFormik } from "formik";
// material
import { TextField, Alert, Stack, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EmailIcon from "@mui/icons-material/Email";
// hooks
import useIsMountedRef from "src/hooks/useIsMountedRef";
// api
import * as api from "src/services";
// notification
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const { t } = useTranslation("login");
  const isMountedRef = useIsMountedRef();
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: (data) => {
      onSent();
      onGetEmail(data.email);
      setloading(false);
    },
    onError: (err) => {
      setloading(false);
      toast.error(err.response.data.message || "Something went wrong!");
    },
  });

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email-must-be-a-valid-email-address"))
      .required(t("email-is-required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setloading(true);
        await mutate(values.email);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            {...getFieldProps("email")}
            type="email"
            label={t("email-address")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            {t("send-email")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
