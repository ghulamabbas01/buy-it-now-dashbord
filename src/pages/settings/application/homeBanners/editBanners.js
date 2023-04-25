import React from "react";
// react router dom
import { useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  HomeBannerEditForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { t } = useTranslation("setting");
  const { data, isLoading } = useQuery(
    "get-home-home-banners",
    api.getHomeBanners,
    {
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );

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
              href: "/categories",
            },
            {
              name: t("edit"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <HomeBannerEditForm data={data?.data} isLoading={isLoading} />
    </Page>
  );
}
