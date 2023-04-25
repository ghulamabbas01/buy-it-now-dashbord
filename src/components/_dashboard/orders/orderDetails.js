import React from "react";
// material
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useTranslation } from "react-i18next";

export default function Details({ data, isLoading }) {
  const { t } = useTranslation("order");
  const user = data?.user;
  return (
    <Stack sx={{ mt: 4 }}>
      <Grid spacing={2} container>
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 226 }}>
            <CardContent>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {isLoading ? (
                  <>
                    <Skeleton variant="rect" width={50} height={50} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Button
                      sx={{
                        display: "block",
                        minWidth: 50,
                        lineHeight: 0,
                        minHeight: 50,
                        color: "text.primary",
                        background: (theme) =>
                          alpha(theme.palette.primary.main, 0.3),
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <Person4RoundedIcon />
                    </Button>
                    <Typography variant="h6">{t("customor-details")}</Typography>
                  </>
                )}
              </Stack>
              <Stack spacing={isLoading ? 0 : 1} sx={{ mt: 3 }}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>{t("name")}</strong>: {user?.fullName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("phone")}</strong>: {user?.phone}
                    </Typography>
                    <Typography
                      sx={{
                        wordWrap: "break-word",
                      }}
                      variant="body2"
                    >
                      <strong>{t("email")}</strong>: {user?.email}
                    </Typography>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 226 }}>
            <CardContent>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {isLoading ? (
                  <>
                    <Skeleton variant="rect" width={50} height={50} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Button
                      sx={{
                        display: "block",
                        minWidth: 50,
                        lineHeight: 0,
                        minHeight: 50,
                        color: "text.primary",
                        background: (theme) =>
                          alpha(theme.palette.primary.main, 0.3),
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <LocalShippingRoundedIcon />
                    </Button>
                    <Typography variant="h6">{t("shipping-address")}</Typography>
                  </>
                )}
              </Stack>
              <Stack spacing={isLoading ? 0 : 1} sx={{ mt: 3 }}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>{t("address")}</strong>: {user?.address} {user?.zip},{" "}
                      {user?.city} {user?.state}, {user?.country}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("order-date")}</strong>:{" "}
                      {new Date(data?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        minute: "numeric",
                        hour: "numeric",
                      })}
                    </Typography>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 226 }}>
            <CardContent>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {isLoading ? (
                  <>
                    <Skeleton variant="rect" width={50} height={50} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Button
                      sx={{
                        display: "block",
                        minWidth: 50,
                        lineHeight: 0,
                        minHeight: 50,
                        color: "text.primary",
                        background: (theme) =>
                          alpha(theme.palette.primary.main, 0.3),
                        path: {
                          stroke: (theme) => theme.palette.text.primary,
                        },
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <CreditCardRoundedIcon />
                    </Button>
                    <Typography variant="h6">{t("payment-method")}</Typography>
                  </>
                )}
              </Stack>
              <Stack spacing={isLoading ? 0 : 1} sx={{ mt: 3 }}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>{t("method")}</strong>: {data?.paymentMethod}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      <strong>{t("status")}</strong>: {data?.status}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      <strong>{t("shipping-fee")}</strong>: {data?.currency}{" "}
                      {data?.shipping}
                    </Typography>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
