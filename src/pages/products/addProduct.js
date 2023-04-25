import React from "react";

//components
import {
  HeaderBreadcrumbs,
  ProductNewForm,
  Toolbar,
  Page,
} from "src/components";
// notification
import toast from 'react-hot-toast';
// api
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";

export default function Create() {
  const { t } = useTranslation("product");

  const { data, isLoading } = useQuery("categories", api.getAllSubCategories, {
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong!");
    },
  });
  return (
    <Page title={`Add Product | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: t("dashboard"), href: "/" },
            { name: t("products"), href: "/products" },
            { name: t("add") },
          ]}
        />
      </Toolbar>
      <ProductNewForm
        isLoading={isLoading}
        categories={isLoading ? [] : data.data}
      />
    </Page>
  );
}
