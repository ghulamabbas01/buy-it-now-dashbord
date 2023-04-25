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

export default function ProductNewForm() {
  const { t } = useTranslation("setting");
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
  });


  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate, isLoading } = useMutation(
    "new primary slider",
    api.createPrimarySlider,
    {
      onSuccess: () => {
        toast.success("New Category Created");
        navigate("/settings/application");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  const NewProductSchema = Yup.object().shape({
    cover: Yup.mixed().required(t("cover-is-required")),
  });

  const formik = useFormik({
    initialValues: {
      heading: "",
      cover: null,
      description: "",
      file: "",
      disabled: false,
      btnPrimaryText: "",
      btnPrimaryLink: "",
      btnSecondaryText: "",
      btnSecondaryLink: "",
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
                    <LabelStyle>{t("heading")}</LabelStyle>
                    <TextField
                      fullWidth
                      {...getFieldProps("heading")}
                      error={Boolean(touched.heading && errors.heading)}
                      helperText={touched.heading && errors.heading}
                    />
                  </div>

                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                    />
                  </div>
                  <div>
                    <LabelStyle>{t("secondary-button-link")}</LabelStyle>
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
                  </div>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div>
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
                    </div>
                    <div>
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
                      {touched.cover && errors.cover && (
                        <FormHelperText error sx={{ px: 2, mx: 0 }}>
                          {touched.cover && errors.cover}
                        </FormHelperText>
                      )}
                    </div>
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch {...getFieldProps("disabled")} />}
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
                  {("create-category")}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
