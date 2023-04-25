import { merge } from "lodash";
// chart
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Skeleton } from "@mui/material";
//
import BaseOptionChart from "./BaseOptionChart";
import { useTranslation } from "react-i18next";
import useDirection from "src/hooks/useDirection";
// ----------------------------------------------------------------------

export default function Income({ data, isLoading }) {
  const { t } = useTranslation("home");
  const chartDirection = useDirection();
  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 0,
    },
    xaxis: {
      categories: [
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
      ],
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
    yaxis: {
      opposite :chartDirection === "rtl"?true:false,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  });

  return (
    <Card sx={{ pb: 1.5 }}>
      <CardHeader title={t("sales-report")}/>

      {isLoading ? (
        <Box mx={3}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={219}
            sx={{ borderRadius: 2, mt: 3 }}
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
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={[
              {
                name: t("sales"),
                data,
              },
            ]}
            options={chartOptions}
            height={260}
          />
        </Box>
      )}
    </Card>
  );
}
