import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch,
  FormHelperText,
  Box,
  Skeleton
} from "@mui/material";
import { UploadSingleFile } from "src/components";
import * as api from "src/services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  span: {
    fontSize: 12,
    float: "right",
    fontWeight: 400,
  },
}));

// ----------------------------------------------------------------------

export default function ProductNewForm({ data, isInitialized }) {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
  });
  const { t } = useTranslation("setting");

  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate, isLoading } = useMutation(
    "update primary slide",
    api.updatePrimarySlider,
    {
      enabled: Boolean(data?._id),
      onSuccess: () => {
        toast.success("Category Updated");
        navigate("/settings/application");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  const NewProductSchema = Yup.object().shape({
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: data?.heading || "",
      cover: data?.cover || null,
      description: data?.description || "",
      file: data?.cover || "",
      disabled: !data?.enabled,
      btnPrimaryText: data?.btnPrimary.btnText,
      btnPrimaryLink: data?.btnPrimary.url,
      btnSecondaryText: data?.btnSecondary.btnText,
      btnSecondaryLink: data?.btnSecondary.url,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const {
        file,
        btnPrimaryText,
        btnPrimaryLink,
        btnSecondaryText,
        btnSecondaryLink,
        disabled,
        ...rest
      } = values;
      try {
        mutate({
          ...rest,
          cover: file,
          enabled: !disabled,
          btnPrimary: {
            btnText: btnPrimaryText,
            url: btnPrimaryLink,
          },
          btnSecondary: {
            btnText: btnSecondaryText,
            url: btnSecondaryLink,
          },
          id: data?._id,
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;
  const handleDrop = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }
    setFieldValue("cover", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-uploads");
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, loading: percentage });
      },
    };
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      )
      .then(({ data }) => {
        setFieldValue("file", {
          _id: data.public_id,
          url: data.secure_url,
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        if (values.file) {
          deleteMutate({ _id: values.file._id });
        }
        setstate({ ...state, loading: false });
      });
  };
  return (
    <Box>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    {isInitialized ? (
                      <>
                        <Skeleton variant="text" width="60px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (<>
                      <LabelStyle>{t("heading")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("heading")}
                        error={Boolean(touched.heading && errors.heading)}
                        helperText={touched.heading && errors.heading}
                      /></>)}
                  </div>

                  <div>
                    {isInitialized ? (
                      <>
                        <Skeleton variant="text" width="140px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (<>
                      <LabelStyle>{t("primary-button-text")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("btnPrimaryText")}
                        error={Boolean(
                          touched.btnPrimaryText && errors.btnPrimaryText
                        )}
                        helperText={
                          touched.btnPrimaryText && errors.btnPrimaryText
                        }
                      />
                    </>)}
                  </div>
                  <div>
                    {isInitialized ? (
                      <>
                        <Skeleton variant="text" width="140px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (<>
                      <LabelStyle>{t("primary-button-link")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("btnPrimaryLink")}
                        error={Boolean(
                          touched.btnPrimaryLink && errors.btnPrimaryLink
                        )}
                        helperText={
                          touched.btnPrimaryLink && errors.btnPrimaryLink
                        }
                      />
                    </>)}
                  </div>
                  <div>
                    {isInitialized ? (
                      <>
                        <Skeleton variant="text" width="160px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (<>
                      <LabelStyle>{t("secondary-button-text")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("btnSecondaryText")}
                        error={Boolean(
                          touched.btnSecondaryText && errors.btnSecondaryText
                        )}
                        helperText={
                          touched.btnSecondaryText && errors.btnSecondaryText
                        }
                      /></>)}
                  </div>
                  <div>
                    {isInitialized ? (
                      <>
                        <Skeleton variant="text" width="160px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (<>
                      <LabelStyle>{t("secondary-button-text")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("btnSecondaryLink")}
                        error={Boolean(
                          touched.btnSecondaryLink && errors.btnSecondaryLink
                        )}
                        helperText={
                          touched.btnSecondaryLink && errors.btnSecondaryLink
                        }
                      />
                    </>)}

                  </div>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div>
                      {isInitialized ? (
                        <>
                          <Skeleton variant="text" width="82px" sx={{ mb: 1 }} />
                          <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={240}
                          />
                        </>
                      ) : (<>
                        <LabelStyle>{t("description")}</LabelStyle>
                        <TextField
                          fullWidth
                          multiline
                          rows={9}
                          // sx={{ pt: 1.4 }}
                          {...getFieldProps("description")}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          helperText={touched.description && errors.description}
                        />
                      </>)}

                    </div>
                    <div>
                      {isInitialized ? (
                        <>
                          <Skeleton variant="text" width="130px" sx={{ mb: 1 }} />
                          <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={225}
                          />
                        </>
                      ) : (<>
                        <LabelStyle>
                          {t("cover")} <span>1920 * 768</span>
                        </LabelStyle>

                        <UploadSingleFile
                          file={values.cover}
                          onDrop={handleDrop}
                          error={Boolean(touched.cover && errors.cover)}
                          category
                          accept="image/*"
                          loading={state.loading}
                        />
                      </>)}
                      {touched.cover && errors.cover && (
                        <FormHelperText error sx={{ px: 2, mx: 0 }}>
                          {touched.cover && errors.cover}
                        </FormHelperText>
                      )}
                    </div>
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              {...getFieldProps("disabled")}
                              checked={values.disabled}
                            />
                          }
                          label={t("disabled")}
                        />
                      </FormGroup>
                    </div>
                  </Stack>
                </Card>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={isLoading || state.loading}
                >
                  {t("update-category")}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
