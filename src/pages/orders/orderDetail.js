import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";

// notification
import toast from 'react-hot-toast';
// material
import {
  Card,
  Typography,
  CardContent,
  Stack,
  Skeleton,
  Divider,
  Table,
  Box,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

// icons
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

// components
import {
  HeaderBreadcrumbs,
  DetailsTable,
  OrderDetails,
  SelectOrderStatus,
  Page,
  Toolbar,
} from "src/components";
// import { InvoiceToolbar } from "src/components/invoice";
// api
import * as api from "src/services";

// utils
import { fCurrency } from "src/utils/formatNumber";
// ----------------------------------------------------------------------
export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation("order");
  const { data: singleOrder, isLoading: orderLoading } = useQuery(
    ["order", id],
    () => api.getSingleOrder(id),
    {
      enabled: Boolean(id),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );


  const data = singleOrder?.data;
  const items = data?.items;
  const { mutate, isLoading: deleteLoading } = useMutation(api.deleteOrder, {
    onSuccess: () => {
      toast.success("Order Deleted");
      navigate("/orders");
    },
    onError: () => {
      toast.error("Something Is Wrong!");
      navigate("/404");
    },
  });
  const isLoading = orderLoading || deleteLoading;
  return (
    <Page title={`Order Details | ${process.env.REACT_APP_DOMAIN_NAME}`}>
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
              href: "/orders",
            },
            {
              name: t("details"),
              href: "",
            },
          ]}
          action={
            <>
              <Box mb={{ sm: 0, xs: 2 }}>
                <LoadingButton
                  variant="contained"
                  startIcon={<DeleteOutlineRoundedIcon />}
                  onClick={() => mutate(data?._id)}
                  loading={deleteLoading}
                  loadingPosition="start"
                >
                  {t("delete")}
                </LoadingButton>
                <SelectOrderStatus data={data} />
              </Box>
            </>
          }
        />
      </Toolbar>
      {/* <InvoiceToolbar invoice={[]} /> */}
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" sx={{ pb: 1 }}>
            {isLoading ? (
              <>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={170} sx={{ ml: "auto" }} />
              </>
            ) : (
              <>
                <Typography variant="h6">{t("order-details")}</Typography>
                <Typography sx={{ ml: "auto" }} variant="body1">
                  {t("order-id")}: {data?._id}
                </Typography>
              </>
            )}
          </Stack>
          <Divider />
          <OrderDetails data={data} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Card sx={{ mt: 1 }}>
        {isLoading ? (
          <Skeleton variant="text" width={100} sx={{ m: 2 }} />
        ) : (
          <Typography variant="h5" sx={{ p: 2 }}>
            {items?.length} {items?.length > 1 ? t("items") : t("item")}
          </Typography>
        )}
        <DetailsTable
          data={items}
          isLoading={isLoading}
          currency={data?.currency}
        />
        <Divider />
        <Table>
          <TableBody>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  bgcolor: (theme) => theme.palette.background.neutral,
                },
              }}
            >
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>{t("subtotal")}</strong>
                )}
              </TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>
                    {data?.currency} {data?.subTotal}
                  </strong>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>{t("shipping-fee")}</strong>
                )}
              </TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>
                    {data?.currency} {data?.shipping}
                  </strong>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>{t("total")}</strong>
                )}
              </TableCell>
              <TableCell align="right">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ float: "right" }}
                    width={100}
                  />
                ) : (
                  <strong>
                    {" "}
                    {data?.currency} {data?.total}
                  </strong>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
