import { useState } from "react";
// react router dom
import { useSearchParams } from "react-router-dom";
// api
import * as api from "src/services";
import { useQuery } from "react-query";
// notification
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
// material
import { Dialog } from "@mui/material";
import {
  HeaderBreadcrumbs,
  DeleteDialog,
  Page,
  Toolbar,
  OrderCard,
  Table,
  OrderRow,
} from "src/components";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "product", alignRight: false },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "inventoryType", label: "status", alignRight: false, sort: true },
  { id: "price", label: "price", alignRight: false, sort: true },
  { id: "quantity", label: "quantity", alignRight: false },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function EcommerceProductList() {
  const { t } = useTranslation("order");

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [apicall, setApicall] = useState(false);
  const { data, isLoading: loadingList } = useQuery(
    ["orders", apicall, pageParam, searchParam],
    () => api.getOrders(+pageParam || 1, searchParam || ""),
    {
      onError: (err) =>
      toast.error(err.response.data.message || "Something went wrong!"),
    }
  );
  const [open, setOpen] = useState(false);

  const [id, setId] = useState(null);

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoading = loadingList;
  return (
    <Page title={`Orders | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteOrder"
          type="Order"
        />
      </Dialog>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("orders"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={OrderRow}
        mobileRow={OrderCard}
        handleClickOpen={handleClickOpen}
      />
    </Page>
  );
}
