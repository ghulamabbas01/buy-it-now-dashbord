import { merge } from "lodash";
// chart
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Skeleton, Box } from "@mui/material";
//
import BaseOptionChart from "./BaseOptionChart";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------
export default function Order({ data, isLoading }) {
  const { t } = useTranslation("home");
  const chartOptions = merge(BaseOptionChart("donut"), {
    labels: [t("pending"), t("on-the-way"), t("delivered"), t("returned"), t("cancelled")],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    stroke: { show: true, colors: ["transparent"] },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      formatter: function (val) {
        return val.toFixed(0) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: { labels: { show: true } },
        expandOnClick: true,
        offsetX: 0,
      },
    },
  });

  return (
    <Card
      sx={{
        pb: 2,
        "& .apexcharts-canvas": {
          margin: "0 auto",
        },
      }}
    >
      <CardHeader title={t("order-report")} sx={{ pb: 3 }} />
      {isLoading ? (
        <Box maxWidth="365px" width="100%" mx="auto">
          <Skeleton
            variant="circular"
            width={190}
            height={190}
            sx={{ mx: "auto", mb: 2.4 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: 1,
              px: 3,
            }}
          >
            <Skeleton variant="text" sx={{ width: "30%" }} />
            <Skeleton variant="text" sx={{ width: "30%" }} />
            <Skeleton variant="text" sx={{ width: "30%" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",

              mb: 1.6,
              px: 3,
            }}
          >
            <Skeleton variant="text" sx={{ width: "30%" }} />
            <Skeleton variant="text" sx={{ width: "30%" }} />
          </Box>
        </Box>
      ) : (
        <ReactApexChart
          type="donut"
          series={data}
          options={chartOptions}
          width="365px"
        />
      )}
    </Card>
  );
}
