import * as Yup from "yup";
import toast from 'react-hot-toast';
import { capitalCase } from "change-case";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grid,
  Stack,
  Select,
  TextField,
  Typography,
  FormControl,
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

export default function ProductNewForm({ categories }) {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
  });
  const { t } = useTranslation("categories");


  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
       toast.error(error.message);
    },
  });
  const { mutate, isLoading } = useMutation("new", api.addSubCategory, {
    onSuccess: () => {
       toast.success("New Category Created");
      navigate("/categories/sub-categories");
    },
    onError: (error) => {
       toast.error(error.message);
    },
  });
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t("name-is-required")),
    parentCategory: Yup.string().required(t("parent-category-is-required")),
    description: Yup.string().required(t("description-is-required")),
    cover: Yup.mixed().required(t("cover-is-required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      cover: null,
      parentCategory: categories.length > 0 ? categories[0].name : "",
      description: "",
      file: "",
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      try {
        mutate({ ...rest, cover: file, status: "active" });
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
                    <LabelStyle>{t("category-name")}</LabelStyle>
                    <TextField
                      fullWidth
                      {...getFieldProps("name")}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </div>
                  <div>
                    <LabelStyle>{t("description")}</LabelStyle>
                    <TextField
                      fullWidth
                      multiline
                      rows={9}
                      // sx={{ pt: 1.4 }}
                      {...getFieldProps("description")}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </div>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <LabelStyle>{t("parent-category")}</LabelStyle>
                      <Select
                        native
                        {...getFieldProps("parentCategory")}
                        error={Boolean(
                          touched.parentCategory && errors.parentCategory
                        )}
                      >
                        <option value="" disabled />
                        {categories?.map((category) => (
                          <option key={Math.random()} value={category.name}>
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
                    <div>
                      <LabelStyle>
                        {t("image")} <span>512 * 512</span>
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
                  </Stack>
                </Card>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={isLoading || state.loading}
                >
                  {t("create-category")}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
