import * as Yup from "yup";
import toast from 'react-hot-toast';
import { capitalCase } from "change-case";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
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
// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [
  "bags",
  "shoes",
  "shirts",
  "makeup",
  "sports",
  "electronics",
  "home appliances",
];

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

export default function ProductEditForm({ currentCategory, categories }) {
  const [state, setstate] = useState({
    loading: false,
  });
  const { t } = useTranslation("categories");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation("update", api.updateSubCategory, {
    enabled: Boolean(currentCategory?._id),
    onSuccess: () => {
      toast.success("Category Updated");
      navigate("/categories/sub-categories");
    },
    onError: (error) => {
       toast.error(error.message);
    },
  });
  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
       toast.error(error.message);
    },
  });
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t("name-is-required")),
    parentCategory: Yup.string().required(t("parent-category-is-required")),
    description: Yup.string().required(t("description-is-required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentCategory?.name,
      cover: currentCategory?.cover,
      parentCategory: currentCategory?.parentCategory,
      description: currentCategory?.description,
      file: currentCategory?.cover,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      try {
        if (_.has(values.cover, "preview")) {
          mutate({ ...rest, cover: file, id: currentCategory?._id });
        } else {
          mutate({
            name: values.name,
            description: values.description,
            parentCategory: values.parentCategory,
            id: currentCategory?._id,
          });
        }
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
        return (
          setFieldValue("file", {
            _id: data.public_id,
            url: data.secure_url,
          }),
          setstate({ ...state, loading: false })
        );
      })
      .then(() => {
        return (
          deleteMutate({ _id: values.file._id }),
          setstate({ ...state, loading: false })
        );
      });
  };
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>
                    {currentCategory ? (
                      t("name")
                    ) : (
                      <Skeleton variant="text" width="100px" />
                    )}
                  </LabelStyle>
                  {!currentCategory ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <TextField
                      fullWidth
                      value={values?.name ?? ""}
                      {...getFieldProps("name")}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                </div>
                <div>
                  <LabelStyle>
                    {currentCategory ? (
                      t("description")
                    ) : (
                      <Skeleton variant="text" width="100px" />
                    )}
                  </LabelStyle>
                  {!currentCategory ? (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={240}
                      sx={{ mb: 1.4 }}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      value={values.description || ""}
                      rows={9}
                      {...getFieldProps("description")}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>
                      {currentCategory ? (
                        t("parent-category")
                      ) : (
                        <Skeleton variant="text" width="100px" />
                      )}
                    </LabelStyle>
                    {!currentCategory ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                        sx={{ mb: 1.4 }}
                      />
                    ) : (
                      <FormControl fullWidth>
                        <Select
                          native
                          {...getFieldProps("parentCategory")}
                          error={Boolean(
                            touched.parentCategory && errors.parentCategory
                          )}
                        >
                          <option
                            value=""
                            disabled
                            style={{ display: "none" }}
                          />
                          {categories?.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Select>
                        {touched.parentCategory && errors.parentCategory && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.parentCategory && errors.parentCategory}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </div>

                  {!currentCategory ? (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={240}
                      sx={{ mb: 1.4 }}
                    />
                  ) : (
                    <div>
                      <LabelStyle>
                        {t("image")} <span>512 * 512</span>
                      </LabelStyle>
                      <UploadSingleFile
                        file={values.cover}
                        onDrop={handleDrop}
                        error={Boolean(touched.cover && errors.cover)}
                        loading={state.loading}
                        category
                      />
                      {touched.cover && errors.cover && (
                        <FormHelperText error sx={{ px: 2, mx: 0 }}>
                          {touched.cover && errors.cover}
                        </FormHelperText>
                      )}
                    </div>
                  )}
                </Stack>
              </Card>

              {!currentCategory ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ mb: 1.4 }}
                />
              ) : (
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={isLoading}
                >
                 {t("edit-category")}
                </LoadingButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
