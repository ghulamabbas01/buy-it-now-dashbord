import React from "react";
import * as api from "src/services";
import { useQuery } from "react-query";
// notification
import toast from 'react-hot-toast';
// components
import Page from "src/components/page";
import {
  HeaderBreadcrumbs,
  Table,
  NewsletterRow,
  NewsletterCard,
  Toolbar,
} from "src/components";
import { useSearchParams } from "react-router-dom";
// ----------------------------------------------------------------------
import { useTranslation } from "react-i18next";
const TABLE_HEAD = [
  { id: "email", label: "email", alignRight: false, sort: true },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "action", label: "actions", alignRight: "right" },
];

// ----------------------------------------------------------------------
export default function EcommerceProductList() {

  const { t } = useTranslation("common");
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const { data, isLoading } = useQuery(
    ["newsletter", pageParam],
    () => api.getNewsletter(+pageParam || 1),
    {
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      },
    }
  );
  return (
    <>
      <Page title={`Newsletter | ${process.env.REACT_APP_DOMAIN_NAME}`}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Categories List"
            links={[
              {
                name: t("dashboard"),
                href: "/",
              },
              {
                name: t("newsletter"),
                href: "",
              },
            ]}
          />
        </Toolbar>
          <Table
            rows={10}
            headData={TABLE_HEAD}
            data={data}
            isLoading={isLoading}
            row={NewsletterRow}
            mobileRow={NewsletterCard}
            onClickCopy={() =>
              toast.success("Email Copied")
            }
          />
      </Page>
    </>
  );
}
