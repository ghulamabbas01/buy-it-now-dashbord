import React from "react";

// notification
import toast from "react-hot-toast";

//components
import {
  HeaderBreadcrumbs,
  Toolbar,
  Page,
  DailyEaring,
  DailyOrders,
  SignupUsers,
  TotalProducts,
  SalesChart,
  IncomeChart,
  OrderChart,
} from "src/components";

// material-ui
import { Grid, Box, Typography } from "@mui/material";

// react-query
import { useQuery } from "react-query";

// api
import * as api from "src/services";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { t } = useTranslation("home");

  // const { t } = useTranslation("home");
  const { data: dashboard, isLoading } = useQuery(
    "dashboard",
    api.dashboardData,
    {
      refetchInterval: 30000,
      onError: (error) => toast.error(error.message || "Something went wrong!"),
    }
  );
  const data = dashboard?.data || {};
  const daily_earning = data?.dailyEarning;
  const daily_orders = data?.dailyOrders;
  const daily_users = data?.dailyUsers;
  const totalProducts = data?.totalProducts;
  const sales_report = data?.salesReport;
  const income_report = data?.incomeReport;
  const orders_report = data?.ordersReport;

  return (
    <Page title={`Dashboard | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/",
            },
          ]}
        />
      </Toolbar>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DailyEaring data={daily_earning} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DailyOrders data={daily_orders} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SignupUsers data={daily_users} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalProducts data={totalProducts} isLoading={isLoading} />
        </Grid>
      </Grid>
      <Box sx={{ mt: { md: 3, xs: 1 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={7}>
            <SalesChart data={sales_report} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <OrderChart data={orders_report} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: { md: 3, xs: 1 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <IncomeChart data={income_report} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
