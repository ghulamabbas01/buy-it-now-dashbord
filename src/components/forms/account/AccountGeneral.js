import React from "react";
import toast from 'react-hot-toast';
import * as Yup from "yup";
// import toast from 'react-hot-toast';
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import { UploadAvatar } from "src/components/upload";
import * as api from "src/services";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { setCount } from "src/redux/slices/settings";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const { t } = useTranslation("setting");
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const { data, isLoading: profileLoading } = useQuery(
    "profile",
    api.getProfile,
    {
      onSuccess: ({ data }) => {
        setAvatarId(data?.cover?._id || null);
      },
      onError: (error) => {
        toast.error( error.response.data.message || "Something went wrong!",)
      },
    }
  );
  const { mutate, isLoading: updateLoading } = useMutation(api.updateProfile, {
    onSuccess: (data) => {
      window.localStorage.removeItem("token");
      window.localStorage.setItem("token", data.token);
      dispatch(setCount());
      toast.success('Update Profile')
    },
  });
  const { mutate: avatarMutate, isLoading: avatarLoading } = useMutation(
    api.singleDeleteFile,
    {
      onSuccess: () => {},
      onError: (error) => {
        toast.error( error.response.data.message || "Something went wrong!")
      },
    }
  );
  const isLoading = profileLoading;
  const user = data?.data || {};
  const [loading, setLoading] = React.useState(100);
  const [avatarId, setAvatarId] = React.useState(null);
  const callbackLoading = useCallback(
    (value) => {
      setLoading(value);
    },
    [setLoading]
  );
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required(t("name-is-requried")),
    phoneNumber: Yup.string().required(t("phone-is-required")),
    gender: Yup.string().required("Gender is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user?.name || "",
      email: user?.email || "",
      photoURL: user?.cover?.url || "",
      phoneNumber: user?.phone || "",
      gender: user?.gender || "",
      about: user?.about || "",
      file: "",
      avatar: user?.cover,
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const data = {
        name: values.displayName,
        email: values.email,
        phone: values.phoneNumber,
        about: values.about,
        gender: values.gender,
        cover: values.avatar,
        id: user._id,
      };
      mutate(data);
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoadingUpload(true);
      setFieldValue("file", file);
      setFieldValue("photoURL", {
        ...file,
        preview: URL.createObjectURL(file),
      });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          callbackLoading(percentage);
        },
      };
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          config
        )
        .then(({ data }) => {
          setFieldValue("avatar", {
            _id: data.public_id,
            url: data.secure_url,
          });
        })
        .then(() => {
          avatarId && avatarMutate({ _id: avatarId });
          setLoadingUpload(false);
        });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 11.8, px: 3, textAlign: "center" }}>
              {isLoading || avatarLoading || loadingUpload ? (
                <Stack alignItems="center">
                  <Skeleton variant="circular" width={142} height={142} />
                  <Skeleton variant="text" width={150} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width={150} />
                </Stack>
              ) : (
                <UploadAvatar
                  accept="image/*"
                  file={values.photoURL}
                  loading={loading}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.photoURL && errors.photoURL)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {3145728}
                    </Typography>
                  }
                />
              )}

              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              {isLoading ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        height={56}
                        width="100%"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        height={56}
                        width="100%"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ mt: "0 !important" }}>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        height={56}
                        width="100%"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        height={56}
                        width="100%"
                      />
                    </Grid>
                  </Grid>
                  <Skeleton
                    variant="rectangular"
                    height="125px"
                    width="100%"
                    sx={{ mt: 3 }}
                  />
                </>
              ) : (
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label={t("name")}
                      {...getFieldProps("displayName")}
                      error={Boolean(touched.displayName && errors.displayName)}
                      helperText={touched.displayName && errors.displayName}
                    />
                    <TextField
                      fullWidth
                      disabled
                      label={t("email-address")}
                      {...getFieldProps("email")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label={t("phone-number")}
                      {...getFieldProps("phoneNumber")}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      type="number"
                      helperText={touched && errors && errors.phoneNumber}
                    />
                    <TextField
                      select
                      fullWidth
                      label={t("gender")}
                      placeholder="gender"
                      {...getFieldProps("gender")}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </TextField>
                  </Stack>
                  <TextField
                    {...getFieldProps("about")}
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                    label={t("about")}
                  />
                </Stack>
              )}
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={36} width={124} />
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={updateLoading || avatarLoading || loadingUpload}
                  >
                    {t("save-changes")}
                  </LoadingButton>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
