import { merge } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// material
import { Card, CardHeader, Box, Tabs, Tab, Skeleton } from "@mui/material";
//
import BaseOptionChart from "./BaseOptionChart";
import ReactApexChart from "react-apexcharts";
// utils
import { fCurrency } from "src/utils/formatNumber";
// ----------------------------------------------------------------------

export default function IncomeChart({ data, isLoading }) {
  const { t } = useTranslation("home");
  const [seriesData, setSeriesData] = useState("week");
  const pastWeek = [...Array(7).keys()].map((days) =>
    new Date(Date.now() - 86400000 * days).toLocaleString("en-us", {
      weekday: "short",
    })
  );
  const handleChange = (event, newValue) => {
    setSeriesData(newValue);
  };
  const month = [
    t("jan"),
    t("feb"),
    t("mar"),
    t("apr"),
    t("may"),
    t("jun"),
    t("jul"),
    t("aug"),
    t("sep"),
    t("oct"),
    t("nov"),
    t("dec"),
  ];
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    xaxis: {
      categories:
        seriesData === "week"
          ? pastWeek.reverse()
          : seriesData === "year"
          ? month
          : null,
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return fCurrency(val);
          },
        },
      },
    ],
  });

  return (
    <Card>
      <CardHeader
        title={t("income-report")}
        action={
          <Tabs
            value={seriesData}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            sx={{
              "& .MuiButtonBase-root:not(:last-of-type)": {
                marginRight: "1rem",
              },
            }}
          >
            <Tab value="week" label={t("week")} />
            <Tab value="month" label={t("month")} />
            <Tab value="year" label={t("year")} />
          </Tabs>
        }
        sx={{ flexWrap: "wrap" }}
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={219}
              sx={{ borderRadius: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                mb: 3,
              }}
            >
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
            </Box>
          </>
        ) : (
          <ReactApexChart
            type="area"
            series={[
              {
                name: t("income"),
                data: data[seriesData],
              },
            ]}
            options={chartOptions}
            height={260}
          />
        )}
      </Box>
    </Card>
  );
}
