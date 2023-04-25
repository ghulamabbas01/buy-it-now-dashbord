import React from "react";
import { useQuery } from "react-query";
import * as api from "src/services";

//components

import {
  HeaderBreadcrumbs,
  ProductEditForm,
  Toolbar,
  Page,
} from "src/components";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function EcommerceProduct() {
  const { pid } = useParams();
  const { t } = useTranslation("product");
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery(
    ["product-update"],
    () => api.getProductDetails(pid),
    {
      enabled: Boolean(pid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const data = product?.data;
  return (
    <Page title={`Edit Product | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Edit Product"
          links={[
            { name: t("dashboard"), href: "/" },
            { name: t("products"), href: "/products" },
            { name: t("edit") },
          ]}
        />
      </Toolbar>

      <ProductEditForm currentProduct={data} isInitialized={!isLoading} />
    </Page>
  );
}
