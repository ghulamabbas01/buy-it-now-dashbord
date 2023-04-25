import * as Yup from "yup";
import PropTypes from "prop-types";
import toast from 'react-hot-toast';
import { capitalCase } from "change-case";
// import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Chip,
  Grid,
  List,
  ListItem,
  Stack,
  Radio,
  Select,
  TextField,
  Skeleton,
  Switch,
  FormGroup,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import { UploadMultiFile } from "src/components";
import * as api from "src/services";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import data from "src/configData.json";
import { fCurrency } from "src/utils/formatNumber";
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
const { GENDER_OPTION, STATUS_OPTIONS } = data;

// ----------------------------------------------------------------------

ProductEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
export default function ProductEditForm({ currentProduct, isInitialized }) {
  const { data: categories, isLoading: categoryLoading } = useQuery(
    "categories",
    api.getAllSubCategories
  );
  const { t } = useTranslation("product");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation("update", api.updateProduct, {
    onSuccess: () => {
      toast.success("Product Updated");
      navigate("/products");
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
    description: Yup.string().required(t("description-is-required")),
    images: Yup.array().min(1, t("images-is-required")),
    price: Yup.number().required(t("price-is-required")),
    brand: Yup.string().required(t("brand-is-required")),
    status: Yup.string().required(t("status-is-required")),
    available: Yup.number().required(t("quantaty-is-required")),
    tags: Yup.array().min(1, t("tags-is-required")),
    category: Yup.string().required(t("category-is-required")),
    code: Yup.string().required(t("code-is-required")),
    sku: Yup.string().required(t("sku-is-required")),
    priceSale: Yup.number().lessThan(
      Yup.ref("price"),
      t("Sale Price should be smaller than Price")
    ),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      images: currentProduct?.images || [],
      code: currentProduct?.code || "",
      brand: currentProduct?.brand || "",
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || "",
      priceSale: currentProduct?.priceSale || "",
      tags: currentProduct?.tags || [],
      gender: currentProduct?.gender || GENDER_OPTION[3],
      category: currentProduct?.category || "",
      status: currentProduct?.status || "",
      available: currentProduct?.available || 0,
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      blob: [],
      isFeatured: currentProduct?.isFeatured || false,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { resetForm }) => {
      const { blob, category, ...rest } = values;
      try {
        const blobData = values.images.filter((image) => image.blob);
        const images = values.images.filter((image) => !image.blob);
        if (blobData.length > 0) {
          mutate({
            ...values,
            category: category,
            images: blobData.concat(images),
            id: currentProduct._id,
            priceSale: values.priceSale || values.price,
          });
        } else {
          mutate({
            ...rest,
            category: category,
            id: currentProduct._id,
            priceSale: values.priceSale || values.price,
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

  const handleDrop = (acceptedFiles) => {
    setloading(true);
    const uploaders = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setloading(percentage);
        },
      };
      setFieldValue("blob", values.blob.concat(acceptedFiles));
      return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      );
    });
    const blobs = acceptedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    axios.all(uploaders).then((data) => {
      const newImages = data.map(({ data }, i) => ({
        url: data.secure_url,
        _id: data.public_id,
        blob: blobs[i],
      }));
      setloading(false);
      setFieldValue("images", values.images.concat(newImages));
    });
  };
  const handleRemoveAll = () => {
    values.images.forEach((image) => {
      deleteMutate({ _id: image._id });
    });
    setFieldValue("images", []);
  };
  const handleRemove = (file) => {
    const removeImage = values.images.filter((_file) => {
      if (_file._id === file._id) {
        deleteMutate({ _id: file._id });
      }
      return _file !== file;
    });
    setFieldValue("images", removeImage);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  {!isInitialized ? (
                    <>
                      <Skeleton variant="text" width="90px" sx={{ mb: 1 }} />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={56}
                      />
                    </>
                  ) : (
                    <>
                      <LabelStyle>{t("name")}</LabelStyle>
                      <TextField
                        fullWidth
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </>
                  )}
                </div>
                <div>
                  {!isInitialized ? (
                    <>
                      <Skeleton variant="text" width="120px" sx={{ mb: 1 }} />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={246}
                      />
                    </>
                  ) : (
                    <>
                      <LabelStyle>{t("description")}</LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        {...getFieldProps("description")}
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        helperText={touched.description && errors.description}
                      />
                    </>
                  )}
                </div>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        {/* <LabelStyle>Category</LabelStyle> */}
                        {!isInitialized || categoryLoading ? (
                          <>
                            <Skeleton variant="text" width="110px" sx={{ mb: 1 }} />
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={56}
                            />
                          </>
                        ) : (
                          <>
                            <LabelStyle>{t("category")}</LabelStyle>
                            <Select
                              native
                              {...getFieldProps("category")}
                              value={values.category}
                              id="grouped-native-select"
                            >
                              {categories?.data?.map((item) => (
                                <optgroup
                                  label={capitalCase(item[0].parentCategory)}
                                  key={Math.random()}
                                >
                                  {item?.map((v) => (
                                    <option key={item._id} value={item?.name}>
                                      {v.name}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </Select>
                          </>
                        )}
                        {touched.category && errors.category && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.category && errors.category}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        {!isInitialized ? (
                          <>
                            <Skeleton variant="text" width="90px" sx={{ mb: 1 }} />
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={56}
                            />
                          </>
                        ) : (
                          <>
                            <LabelStyle>{t("brand")}</LabelStyle>
                            <TextField
                              fullWidth
                              {...getFieldProps("brand")}
                              error={Boolean(touched.brand && errors.brand)}
                              helperText={touched.brand && errors.brand}
                            />
                          </>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        {!isInitialized ? (
                          <>
                            <Skeleton variant="text" width="90px" sx={{ mb: 1 }} />
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={56}
                            />
                          </>
                        ) : (
                          <>
                            <LabelStyle>{t("status")}</LabelStyle>
                            <Select
                              native
                              {...getFieldProps("status")}
                              error={Boolean(touched.status && errors.status)}
                            >
                              <option value="" style={{ display: "none" }} />
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {capitalCase(status)}
                                </option>
                              ))}
                            </Select>
                          </>
                        )}
                        {touched.status && errors.status && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.status && errors.status}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>

                      {!isInitialized ? (
                        <>
                          <Skeleton variant="text" width="90px" sx={{ mb: 1 }} />
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={56}
                          />
                        </>
                      ) : (
                        <>
                          <LabelStyle>{t("sizes")}</LabelStyle>
                          <Autocomplete
                            multiple
                            freeSolo
                            value={values.sizes}
                            onChange={(event, newValue) => {
                              setFieldValue("sizes", newValue);
                            }}
                            options={[]}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={option}
                                  size="small"
                                  label={option}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={Boolean(touched.sizes && errors.sizes)}
                                helperText={touched.sizes && errors.sizes}
                              />
                            )}
                          />
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {!isInitialized ? (
                        <>
                          <Skeleton variant="text" width="90px" sx={{ mb: 1 }} />
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={56}
                          />
                        </>
                      ) : (
                        <>
                          <LabelStyle>{t("colors")}</LabelStyle>
                          <Autocomplete
                            multiple
                            freeSolo
                            value={values.colors}
                            onChange={(event, newValue) => {
                              setFieldValue("colors", newValue);
                            }}
                            options={[]}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={option}
                                  size="small"
                                  label={option}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={Boolean(touched.colors && errors.colors)}
                                helperText={touched.colors && errors.colors}
                              />
                            )}
                          />
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {!isInitialized ? (
                        <>
                          <Skeleton variant="text" width="60px" sx={{ mb: 1 }} />
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={56}
                          />
                        </>
                      ) : (
                        <>
                          <LabelStyle>{t("tags")}</LabelStyle>
                          <Autocomplete
                            multiple
                            freeSolo
                            value={values.tags}
                            onChange={(event, newValue) => {
                              setFieldValue("tags", newValue);
                            }}
                            options={[]}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={option}
                                  size="small"
                                  label={option}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={Boolean(touched.tags && errors.tags)}
                                helperText={touched.tags && errors.tags}
                              />
                            )}
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </div>

                <div>
                  {!isInitialized ? (
                    <>
                      <Skeleton variant="text" width={"200px"} />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={234}
                      />
                    </>
                  ) : (
                    <>
                      <LabelStyle>
                        {t("products-images")} <span>1080 * 1080</span>
                      </LabelStyle>
                      <UploadMultiFile
                        blob={values.blob}
                        isEdit
                        isInitialized={isInitialized}
                        loading={loading}
                        maxSize={3145728}
                        accept="image/*"
                        files={values.images}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                        error={Boolean(touched.images && errors.images)}
                      />
                    </>
                  )}

                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                  {!isInitialized && (
                    <List disablePadding>
                      {[1, 2, 4].map(() => (
                        <ListItem
                          key={Math.random()}
                          sx={{
                            my: 1,
                            p: 0,
                            width: 80,
                            height: 80,
                            borderRadius: 1,
                            display: "inline-flex",
                            mx: 0.5,
                            border: (theme) =>
                              `solid 1px ${theme.palette.divider}`,
                          }}
                        >
                          <Skeleton
                            variant="rectagular"
                            width={"100%"}
                            height={"100%"}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  <Stack direction="row" justifyContent="flex-end">
                    {!isInitialized && (
                      <Skeleton
                        variant="rectagular"
                        width={106}
                        height={36}
                        sx={{ mr: 1.5 }}
                      />
                    )}
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    {!isInitialized ? (
                      <>
                        <Skeleton variant="text" width="130px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (
                      <>
                        <LabelStyle>{t("product-code")}</LabelStyle>
                        <TextField
                          fullWidth
                          {...getFieldProps("code")}
                          error={Boolean(touched.code && errors.code)}
                          helperText={touched.code && errors.code}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {!isInitialized ? (
                      <>
                        <Skeleton variant="text" width="130px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (
                      <>
                        <LabelStyle>{("product-sku")}</LabelStyle>
                        <TextField
                          fullWidth
                          {...getFieldProps("sku")}
                          error={Boolean(touched.sku && errors.sku)}
                          helperText={touched.sku && errors.sku}
                        />
                      </>
                    )}
                  </div>

                  <div>
                    <LabelStyle>
                      {!isInitialized ? (
                        <Skeleton variant="text" width={"120px"} />
                      ) : (
                        t("gender")
                      )}
                    </LabelStyle>
                    <RadioGroup {...getFieldProps("gender")}>
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent={
                          !isInitialized ? "space-between" : "left"
                        }
                      >
                        {GENDER_OPTION.map((gender, i) =>
                          !isInitialized ? (
                            <Skeleton
                              key={`gender-${i}`}
                              variant="rectagular"
                              width={"120px"}
                              height={24}
                              sx={{ my: 1 }}
                            />
                          ) : (
                            <FormControlLabel
                              key={gender}
                              value={gender || ""}
                              control={<Radio />}
                              label={t(gender)}
                              sx={{ mr: 3 }}
                            />
                          )
                        )}
                      </Stack>
                    </RadioGroup>
                  </div>
                  <div>
                    {!isInitialized ? (
                      <>
                        <Skeleton variant="text" width="110px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (
                      <>
                        <LabelStyle>{t("quantity")}</LabelStyle>
                        <TextField
                          fullWidth
                          type="number"
                          {...getFieldProps("available")}
                          error={Boolean(touched.available && errors.available)}
                          helperText={touched.available && errors.available}
                        />
                      </>
                    )}
                  </div>
                </Stack>
              </Card>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    {!isInitialized ? (
                      <>
                        <Skeleton variant="text" width="120px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (
                      <>
                        <LabelStyle>{t("regular-price")}</LabelStyle>
                        <TextField
                          fullWidth
                          placeholder="0.00"
                          {...getFieldProps("price")}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {fCurrency(0)?.split("0")[0]}
                              </InputAdornment>
                            ),
                            type: "number",
                          }}
                          error={Boolean(touched.price && errors.price)}
                          helperText={touched.price && errors.price}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {!isInitialized ? (
                      <>
                        <Skeleton variant="text" width="110px" sx={{ mb: 1 }} />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={56}
                        />
                      </>
                    ) : (
                      <>
                        <LabelStyle>{t("sale-price")}</LabelStyle>
                        <TextField
                          fullWidth
                          placeholder="0.00"
                          {...getFieldProps("priceSale")}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {fCurrency(0)?.split("0")[0]}
                              </InputAdornment>
                            ),
                            type: "number",
                          }}
                          error={Boolean(touched.priceSale && errors.priceSale)}
                          helperText={touched.priceSale && errors.priceSale}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {!isInitialized ? (
                      <Skeleton variant="text" height={38} />
                    ) : (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              {...getFieldProps("isFeatured")}
                              checked={values.isFeatured}
                            />
                          }
                          label={t("featured-product")}
                        />
                      </FormGroup>
                    )}
                  </div>
                </Stack>
              </Card>
              {!isInitialized ? (
                <Skeleton variant="rectagular" width={"100%"} height={56} />
              ) : (
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={isLoading || loading}
                >
                  {t("save-changes")}
                </LoadingButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
