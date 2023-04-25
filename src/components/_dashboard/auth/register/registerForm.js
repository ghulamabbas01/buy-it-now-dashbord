import * as Yup from "yup";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
// hooks

//
import PersonIcon from "@mui/icons-material/Person";
import FemaleIcon from "@mui/icons-material/Female";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
// import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as api from "src/services";
import { jwtDecode } from "src/utils/jwt";
import { useDispatch } from "react-redux";
import { setLogin } from "src/redux/slices/settings";
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { t } = useTranslation("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useMutation(api.register, {
    onSuccess: (data) => {
      const user = jwtDecode(data.token);
      window.localStorage.setItem("token", data.token);
      toast.success("Welcome " + user.name);

      dispatch(setLogin(user));
      setloading(false);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong!");
      setloading(false);
    },
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required(t("name-required")),
    email: Yup.string()
      .email(t("email-must-be-a-valid-email-address"))
      .required(t("email-is-required")),
    phone: Yup.string()
      .required(t("phone-number-is-required"))
      .matches(phoneRegExp, "Phone number is not valid"),
    password: Yup.string()
      .required(t("password-is-required"))
      .min(6, "Too Short Password!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      gender: "male",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setloading(true);
      mutate(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )} */}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={t("full-name")}
              type="text"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label={t("gender")}
              {...getFieldProps("gender")}
              error={Boolean(touched.gender && errors.gender)}
              helperText={touched.gender && errors.gender}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FemaleIcon />
                  </InputAdornment>
                ),
              }}
            >
              {["male", "female"].map((option) => (
                <MenuItem key={option} value={option.toLowerCase()}>
                  {t(option)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label={t("phone-no")}
              {...getFieldProps("phone")}
              type="number"
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
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
                  <HttpsIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
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

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            {t("register")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
