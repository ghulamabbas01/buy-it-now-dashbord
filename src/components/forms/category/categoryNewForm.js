import * as Yup from "yup";
// import toast from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Card, Stack, TextField, Typography, Box } from "@mui/material";
import * as api from "src/services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
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
}));

// ----------------------------------------------------------------------

export default function ProductNewForm() {
  const navigate = useNavigate();
  const { t } = useTranslation("categories");
  const { mutate, isLoading } = useMutation("new", api.addCategory, {
    onSuccess: () => {
      toast.success("New Category Created");
      navigate("/categories/main-categories");
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t("name-is-required")),

    description: Yup.string().required(t("description-is-required")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: "",
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      try {
        mutate({ ...rest, status: "active", cover: "" });
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

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isLoading}
              sx={{ ml: "auto", mt: 3 }}
            >
              {t("create-category")}
            </LoadingButton>
          </Card>
        </Form>
      </FormikProvider>
    </Box>
  );
}
