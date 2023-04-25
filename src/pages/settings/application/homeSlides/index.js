import React, { useState } from "react";
import HeroCarousel from "src/components/heroCarousel";
// mui
import { Dialog, Box } from "@mui/material";
// notification
import toast from "react-hot-toast";
//components
import {
  HeaderBreadcrumbs,
  DeleteDialog,
  Page,
  Toolbar,
  Table,
  HomeSliderRow,
} from "src/components";

// api
import * as api from "src/services";
// usequery
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

export default function PrimarySlider() {
  const { t } = useTranslation("setting");

  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);
  const { data, isLoading } = useQuery(
    ["primary-slider", apicall],
    () => api.getPrimarySlider(),
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
    <div>
      {" "}
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteCategory"
          type="Category"
        />
      </Dialog>
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
                name: t("app-setting"),
                href: "",
              },
            ]}
            action={{
              href: `/settings/application/slides/add`,
              title: t("add-slide"),
            }}
          />
        </Toolbar>
        <Box>
          <HeroCarousel
            isLoading={isLoading}
            data={data?.data}
            handleClickOpen={handleClickOpen}
          />
        </Box>
      </Page>
    </div>
  );
}
