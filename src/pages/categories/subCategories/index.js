import React, { useState } from "react";
// react router dom
import { useSearchParams } from "react-router-dom";
// notification
import toast from 'react-hot-toast';
// api
import * as api from "src/services";
// usequery
import { useQuery } from "react-query";
// mui
import { Dialog } from "@mui/material";
// components
import {
  HeaderBreadcrumbs,
  DeleteDialog,
  Page,
  Toolbar,
  SubCategoryCard,
  Table,
  SubCategoryRow,
} from "src/components";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "category", alignRight: false, sort: true },
  {
    id: "category",
    label: "category",
    alignRight: false,
    sort: true,
  },
  { id: "items", label: "total-items", alignRight: false },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function EcommerceProductList() {
  const { t } = useTranslation("categories");

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading } = useQuery(
    ["sub-categories", apicall, searchParam, pageParam],
    () => api.getSubCategories(+pageParam || 1, searchParam || ""),
    {
      onError: (err) =>
      toast.error(err.response.data.message || "Something went wrong!"),
    }
  );

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteSubCategory"
          type="Category"
        />
      </Dialog>
      <Page title={`Categories | ${process.env.REACT_APP_DOMAIN_NAME}`}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Categories List"
            links={[
              {
                name: t("dashboard"),
                href: "/",
              },
              {
                name: t("categories"),
                href: "/categories/sub-categories",
              },
            ]}
            action={{
              href: `/categories/sub-categories/add`,
              title: t('add-sub-category'),
            }}
          />
        </Toolbar>
        <Table
          headData={TABLE_HEAD}
          data={data}
          mobileRow={SubCategoryCard}
          isLoading={isLoading}
          row={SubCategoryRow}
          handleClickOpen={handleClickOpen}
        />
      </Page>
    </>
  );
}
