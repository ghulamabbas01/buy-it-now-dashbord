import { useState } from "react";
import * as api from "src/services";
import { useQuery, useMutation } from "react-query";
import { Dialog } from "@mui/material";
// components
import toast from 'react-hot-toast';
import {
  HeaderBreadcrumbs,
  Table,
  ProductRow,
  DeleteDialog,
  Toolbar,
  ProductCard,
  Page,
} from "src/components";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "product", alignRight: false, sort: true },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "inventoryType", label: "status", alignRight: false, sort: false },
  { id: "rating", label: "rating", alignRight: false, sort: true },
  { id: "price", label: "price", alignRight: false, sort: true },
  { id: "featured", label: "featured", alignRight: false },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function EcommerceProductList() {
  const { t } = useTranslation("product");

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [apicall, setApicall] = useState(0);
  const { data, isLoading: loadingList } = useQuery(
    ["product", apicall, pageParam, searchParam],
    () => api.getProducts(+pageParam || 1, searchParam || "")
  );

  const [open, setOpen] = useState(false);

  const [id, setId] = useState(null);

  const { isLoading: loadingUpdate, mutate } = useMutation(
    "update",
    api.updateProduct,
    {
      onSuccess: () => {
        setApicall(apicall + 1);
        toast.success("Status Updated");
      },
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      },
    }
  );

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoading = loadingList || loadingUpdate;
  return (
    <Page title={`Products | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteProduct"
          type="Product"
        />
      </Dialog>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[{ name: t("dashboard"), href: "/" }, { name: t("product-list") }]}
          action={{
            href: `/products/add`,
            title: t("add-product"),
          }}
        />
      </Toolbar>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={ProductRow}
        mobileRow={ProductCard}
        handleClickOpen={handleClickOpen}
        mutate={mutate}
      />
    </Page>
  );
}
