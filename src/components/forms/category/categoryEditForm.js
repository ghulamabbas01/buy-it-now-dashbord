import * as Yup from "yup";
import toast from 'react-hot-toast';
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import _ from "lodash";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Card, Stack, TextField, Skeleton, Typography } from "@mui/material";

// routes

import * as api from "src/services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ProductEditForm({ currentCategory }) {
  const navigate = useNavigate();
  const { t } = useTranslation("categories");
  const { mutate, isLoading } = useMutation("update", api.updateCategory, {
    enabled: Boolean(currentCategory?._id),
    onSuccess: () => {
      toast.success("Category Updated");
      navigate("/categories/main-categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(("name-is-required")),

    description: Yup.string().required(t("description-is-required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentCategory?.name,
      cover: currentCategory?.cover,

      description: currentCategory?.description,
      file: currentCategory?.cover,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      try {
        if (_.has(values.cover, "preview")) {
          mutate({ ...rest, cover: "", id: currentCategory?._id });
        } else {
          mutate({
            description: values.description,
            name: values.name,
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

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          {!currentCategory ? (
            <Skeleton
              variant="rectangular"
              width="151px"
              height={56}
              sx={{ mt: 3 }}
            />
          ) : (
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isLoading}
              sx={{ mt: 3 }}
            >
              {t("edit-category")}
            </LoadingButton>
          )}
        </Card>
      </Form>
    </FormikProvider>
  );
}
