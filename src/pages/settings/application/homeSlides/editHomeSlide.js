import React from "react";
import { useTranslation } from "react-i18next";
// react router dom
import { useParams, useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  HomeSlideEditForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
export default function CreateCategory() {
  const { sid } = useParams();
  const navigate = useNavigate();
  const { data,isLoading } = useQuery(
    ["get single slide", sid],
    () => api.getPrimarySlide(sid),
    {
      enabled: Boolean(sid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const { t } = useTranslation("setting");
  return (
    <Page title={`Edit Home Slide | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("app-setting"),
              href: "/settings/application",
            },
            {
              name: t("add"),
              href: "/",
            },
          ]}
        />
      </Toolbar>

      <HomeSlideEditForm data={data?.data} isInitialized={isLoading} />
    </Page>
  );
}
