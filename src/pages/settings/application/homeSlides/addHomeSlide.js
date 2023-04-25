import React from "react";
// material
import { useTranslation } from "react-i18next";
//components
import {
  HeaderBreadcrumbs,
  HomeSlideNewForm,
  Page,
  Toolbar,
} from "src/components";
export default function CreateCategory() {
  const { t } = useTranslation("setting");
  return (
    <Page title={`Add Home Slide | ${process.env.REACT_APP_DOMAIN_NAME}`}>
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
      <HomeSlideNewForm />
    </Page>
  );
}
