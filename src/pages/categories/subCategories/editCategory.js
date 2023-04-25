import React from "react";
// react router dom
import { useParams, useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  SubCategoryEditForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
// notification
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function UpdateCategory() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("categories");


  const { data: categories, isLoading } = useQuery(
    "categories",
    api.getAllCategories,
    {
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!")
      },
    }
  );
  const { data: category } = useQuery(
    ["update-category", cid],
    () => api.getSubCategory(cid),
    {
      enabled: Boolean(cid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const data = category?.data;
  return (
    <Page title={`Edit Category | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("sub-categories"),
              href: "/categories/sub-categories",
            },
            {
              name: t("edit"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <SubCategoryEditForm
        currentCategory={data}
        categories={isLoading ? [] : categories?.data}
      />
    </Page>
  );
}
