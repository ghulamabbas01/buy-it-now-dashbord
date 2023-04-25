import * as Yup from "yup";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// react query
import { useMutation } from "react-query";
// react router dom
import { Link as RouterLink, useNavigate } from "react-router-dom";
// notification
// import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
// formik
import { useFormik, Form, FormikProvider } from "formik";
// icons
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
// api
import * as api from "src/services";
// jwt
import { jwtDecode } from "src/utils/jwt";
import { useDispatch } from "react-redux";
import { setLogin } from "src/redux/slices/settings";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { t } = useTranslation("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useMutation(api.login, {
    onSuccess: (data) => {
      const user = jwtDecode(data?.token);
      window.localStorage.setItem("token", data?.token);
      toast.success("Login success");
      dispatch(setLogin(user));
      setloading(false);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(error.response.data.message || "Something went wrong!");
      setloading(false);
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email-must-be-a-valid-email-address"))
      .required(t("email-is-required")),
    password: Yup.string().required(t("password-is-required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "test@commercehope.com",
      password: "test1234",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      setloading(true);
      mutate({ email, password });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Toaster />
        <Stack spacing={3}>
          {/* {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )} */}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("email-address")}
            {...getFieldProps("email")}
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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={t("password")}
            {...getFieldProps("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label={t("remember-me")}
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/auth/forget-password"
          >
            {t("forgot-password")}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          {t("login")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
