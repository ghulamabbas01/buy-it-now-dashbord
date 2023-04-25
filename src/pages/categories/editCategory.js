import React from "react";
// react router dom
import { useParams, useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  CategoryEditForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function UpdateCategory() {
  const { t } = useTranslation("categories");
  const { cid } = useParams();
  const navigate = useNavigate();
  const { data: category } = useQuery(
    ["update-category", cid],
    () => api.getCategory(cid),
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
              name: t("categories"),
              href: "/categories/main-categories",
            },
            {
              name: t("edit"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <CategoryEditForm currentCategory={data} />
    </Page>
  );
}
