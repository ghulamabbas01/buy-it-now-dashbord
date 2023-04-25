import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import _ from "lodash";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grid,
  Stack,
  Select,
  TextField,
  Skeleton,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";

// routes
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

export default function ProductEditForm({ data, isLoading: loading }) {
  const { t } = useTranslation("setting");
  const [state, setstate] = useState({
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
  });
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    "update-home-banners",
    api.updateHomeBanners,
    {
      onSuccess: () => {
        toast.success("Home Banners Updated");
        navigate("/settings/application?tab-index=1");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const NewProductSchema = Yup.object().shape({
    banner1: Yup.mixed().required(t("first-banner-after-slider-is-required")),
    banner2: Yup.mixed().required(t("second-banner-after-slider-is-required")),
    banner3: Yup.mixed().required(t("third-banner-after-slider-is-required")),
    banner4: Yup.mixed().required(t("center-banner-after-slider-is-required")),
    url1: Yup.string().url(t("must-be-valid-url")),
    url2: Yup.string().url(t("must-be-valid-url")),
    url3: Yup.string().url(t("must-be-valid-url")),
    url4: Yup.string().url(t("must-be-valid-url")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      banner1: data?.bannerAfterSlider1?.cover,
      banner2: data?.bannerAfterSlider2?.cover,
      banner3: data?.bannerAfterSlider3?.cover,
      banner4: data?.centeredBanner?.cover,
      file1: data?.bannerAfterSlider1?.cover,
      file2: data?.bannerAfterSlider2?.cover,
      file3: data?.bannerAfterSlider3?.cover,
      file4: data?.centeredBanner?.cover,
      url1: data?.bannerAfterSlider1?.url,
      url2: data?.bannerAfterSlider2?.url,
      url3: data?.bannerAfterSlider3?.url,
      url4: data?.centeredBanner?.url,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { file1, file2, file3, file4, url1, url2, url3, url4 } = values;
      try {
        mutate({
          ...(values.banner1 && {
            bannerAfterSlider1: {
              cover: file1,
              url: url1,
            },
          }),
          ...(values.banner2 && {
            bannerAfterSlider2: {
              cover: file2,
              url: url2,
            },
          }),
          ...(values.banner3 && {
            bannerAfterSlider3: {
              cover: file3,
              url: url3,
            },
          }),
          ...(values.banner3 && {
            centeredBanner: {
              cover: file4,
              url: url4,
            },
          }),
          bannerAfterSlider2: {
            cover: file2,
            url: url2,
          },
          bannerAfterSlider3: {
            cover: file3,
            url: url3,
          },
          centeredBanner: {
            cover: file4,
            url: url4,
          },
        });
        // if (_.has(values["banner" + prop], "preview")) {

        // } else {
        //   mutate({
        //     name: values.name,
        //     parentCategory: values.parentCategory,
        //     id: data?._id,
        //   });
        // }
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
  const handleDrop = async (acceptedFiles, prop) => {
    setstate({ ...state, [`loading${prop}`]: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }
    setFieldValue(`banner${prop}`, file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-uploads");
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, [`loading${prop}`]: percentage });
      },
    };
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      )
      .then(({ data }) => {
        return (
          setFieldValue(`file${prop}`, {
            _id: data.public_id,
            url: data.secure_url,
          }),
          setstate({ ...state, ["loading" + prop]: false })
        );
      })
      .then(() => {
        return (
          values[`file${prop}`]._id &&
            deleteMutate({ _id: values[`file${prop}`]._id }),
          setstate({ ...state, ["loading" + prop]: false })
        );
      });
  };
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div>
                <LabelStyle>
                  {" "}
                  {!loading ? (
                    <>
                      {t("first-banner")}<span>1080 *1080</span>
                    </>
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ mb: 1.4 }}
                  />
                ) : (
                  <>
                    <UploadSingleFile
                      file={values.banner1}
                      onDrop={(file) => handleDrop(file, 1)}
                      error={Boolean(touched.banner1 && errors.banner1)}
                      loading={state.loading1}
                      category
                      sx={{ mb: 3 }}
                    />
                    {touched.banner1 && errors.banner1 && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.banner1 && errors.banner1}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>

              <div>
                <LabelStyle>
                  {!loading ? (
                    t("first-banner-link")
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    value={values?.url1 ?? ""}
                    {...getFieldProps("url1")}
                    error={Boolean(touched.url1 && errors.url1)}
                    helperText={touched.url1 && errors.url1}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <LabelStyle>
                  {" "}
                  {!loading ? (
                    <>
                      {t("second-banner")}<span>1080 * 520</span>
                    </>
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ mb: 1.4 }}
                  />
                ) : (
                  <>
                    <UploadSingleFile
                      file={values.banner2}
                      onDrop={(file) => handleDrop(file, 2)}
                      error={Boolean(touched.banner2 && errors.banner2)}
                      loading={state.loading2}
                      category
                      sx={{ mb: 3 }}
                    />
                    {touched.banner2 && errors.banner2 && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.banner2 && errors.banner2}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>

              <div>
                <LabelStyle>
                  {!loading ? (
                    t('second-banner-link')
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    value={values?.url2 ?? ""}
                    {...getFieldProps("url2")}
                    error={Boolean(touched.url2 && errors.url2)}
                    helperText={touched.url2 && errors.url2}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <LabelStyle>
                  {" "}
                  {!loading ? (
                    <>
                      {t("third-banner")}<span>1080 * 520</span>
                    </>
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ mb: 1.4 }}
                  />
                ) : (
                  <>
                    <UploadSingleFile
                      file={values.banner3}
                      onDrop={(file) => handleDrop(file, 3)}
                      error={Boolean(touched.banner3 && errors.banner3)}
                      loading={state.loading3}
                      category
                      sx={{ mb: 3 }}
                    />
                    {touched.banner3 && errors.banner3 && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.banner3 && errors.banner3}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>

              <div>
                <LabelStyle>
                  {!loading ? (
                    t("third-banner-link")
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    value={values?.url3 ?? ""}
                    {...getFieldProps("url3")}
                    error={Boolean(touched.url3 && errors.url3)}
                    helperText={touched.url3 && errors.url3}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <LabelStyle>
                  {" "}
                  {!loading ? (
                    <>
                      {t("centered-banner")}<span>1920 * 768</span>
                    </>
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ mb: 1.4 }}
                  />
                ) : (
                  <>
                    <UploadSingleFile
                      file={values.banner4}
                      onDrop={(file) => handleDrop(file, 4)}
                      error={Boolean(touched.banner4 && errors.banner4)}
                      loading={state.loading4}
                      category
                      sx={{ mb: 3 }}
                    />
                    {touched.banner4 && errors.banner4 && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.banner4 && errors.banner4}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>

              <div>
                <LabelStyle>
                  {!loading ? (
                    t("center-banner-link")
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </LabelStyle>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    value={values?.url4 ?? ""}
                    {...getFieldProps("url4")}
                    error={Boolean(touched.url4 && errors.url4)}
                    helperText={touched.url4 && errors.url4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </div>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="101.6px"
                  height={56}
                  sx={{ mb: 1.4, mt: 3, ml: "auto" }}
                />
              ) : (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isLoading}
                  sx={{ mt: 3, float: "right" }}
                >
                  {t("update")}
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Form>
    </FormikProvider>
  );
}
