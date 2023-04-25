import React from "react";
import * as Yup from "yup";
// formik
import { Form, FormikProvider, useFormik } from "formik";
// react query
import { useMutation } from "react-query";
// material
import {
  TextField,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
// import useIsMountedRef from "../../../../hooks/useIsMountedRef";
// api
import * as api from "src/services";

// notification
import toast from 'react-hot-toast';
// react rputer dom
import { useSearchParams, useNavigate } from "react-router-dom";
// icons
import LockIcon from "@mui/icons-material/Lock";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const {t} =useTranslation("login")
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setloading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { mutate } = useMutation(api.resetPassword, {
    onSuccess: (data) => {
      setloading(false);
      navigate("/auth/login");
      toast.success(data.message);
    },
    onError: (err) => {
      setloading(false);
      toast.error(err.response.data.message || "Something went wrong!");
    },
  });

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("password-must-contains-8-chars"))
      .required(t("password-is-required")),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      t("passwords-must-match")
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setloading(true);
      await mutate({ newPassword: values.password, token });
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
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            {...getFieldProps("confirmPassword")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            {t("save")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
