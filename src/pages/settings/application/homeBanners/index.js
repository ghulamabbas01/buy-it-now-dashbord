import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";
import * as api from "src/services";
import { Skeleton } from "@mui/material";
import NoData from "src/pages/noData";

export default function HomeBanners() {
  const { data, isLoading } = useQuery(
    "get-home-home-banners",
    api.getHomeBanners,
    {
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          // navigate("/404");
        }
      },
    }
  );

  return (
    <>
      <Card
        sx={{
          p: 2,
          img: {
            borderRadius: "8px",
            objectFit: "cover",
            "&:after": {
              content: `""`,
              display: "block",
              pb: "100%",
            },
          },
        }}
      >
        {!isLoading && !data?.data ? (
          <NoData />
        ) : (
          <>
            <Grid container spacing={1}>
              <Grid item lg={6}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={400} />
                ) : (
                  <img
                    alt="banner-1"
                    src={data?.data.bannerAfterSlider1.cover.url}
                    width="100%"
                    height={400}
                  />
                )}
              </Grid>
              <Grid item lg={6}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={196} />
                ) : (
                  <img
                    alt="banner-1"
                    src={data?.data.bannerAfterSlider2.cover.url}
                    width="100%"
                    height={196}
                  />
                )}
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={196}
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <img
                    alt="banner-1"
                    src={data?.data.bannerAfterSlider3.cover.url}
                    width="100%"
                    height={195}
                  />
                )}
              </Grid>
            </Grid>

            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ mt: 1 }}
              />
            ) : (
              <Box
                component="img"
                alt="banner-1"
                src={data?.data.centeredBanner.cover.url}
                width="100%"
                height={300}
                sx={{
                  borderRadius: "8px",
                  mt: 1,
                }}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}
