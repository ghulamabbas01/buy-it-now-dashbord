import React from "react";
import { uniqueId } from "lodash";
// material
import {
  Grid,
  Paper,
  Typography,
  Skeleton,
  IconButton,
  Box,
  Stack,
  Link,
  Rating,
  Avatar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Label } from "src/components";
import { fDateShort } from "src/utils/formatTime";
import { capitalize } from "lodash";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link as RouterLink } from "react-router-dom";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { fCurrency } from "src/utils/formatNumber";
import { paramCase } from "change-case";
const RootStyle = styled(Paper)(({ theme }) => ({
  padding: "10px 10px 10px 16px",
  marginBottom: "0.5rem",
  backgroundColor: theme.palette.background.paper,
  border: "1px solid " + theme.palette.divider,
  borderRadius: 4,
  "& .name": {
    fontWeight: 600,
    color: theme.palette.info.main,
  },
  "& .time svg": {
    width: 10,
    height: 10,
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
  "& .date": {
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  "& .callander": {
    "& svg": {
      width: 10,
      height: 10,
    },
  },
  "& .time-slot": {
    fontWeight: 500,
    fontSize: "0.75rem",
  },
  "& .phone-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "0.5rem",
    "& .phone": {
      color: theme.palette.text.secondary,
      fontWeight: 400,
      fontSize: 11,
    },
    "& .btn-phone": {
      fontSize: "1px",
    },
  },
}));

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 36,
  height: 36,
  objectFit: "cover",
  border: "1px solid " + theme.palette.divider,
  borderRadius: theme.shape.borderRadiusSm,
}));

export default function AgendaCodeMobile({ item, isLoading, handleClickOpen }) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        borderLeft: `6px solid ${
          isLoading
            ? theme.palette.divider
            : theme.palette[
                (item?.available < 1 && "error") ||
                  (item?.available < 20 && "warning") ||
                  (item?.available >= 20 && "success") ||
                  "primary"
              ].main
        }`,
      }}
      key={uniqueId()}
    >
      <Grid container alignItems="center">
        <Grid item md={8} sm={8} xs={8}>
          <Stack spacing={0.5}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={36}
                height={36}
                sx={{ borderRadius: 1 }}
              />
            ) : Boolean(item.cover) ? (
              <ThumbImgStyle alt={item?.name} src={item?.cover} />
            ) : (
              <Avatar>{item.name.slice(0, 1)}</Avatar>
            )}
            {isLoading ? (
              <Skeleton variant="text" />
            ) : (
              <Link
                className="name"
                component={RouterLink}
                to={`/products/${paramCase(item?.name)}`}
                underline="none"
                noWrap
              >
                {capitalize(item.name)}
              </Link>
            )}
            <Stack alignItems="center" sx={{ gap: "6px" }} direction="row">
              {isLoading ? (
                <Skeleton variant="circular" width={20} height={20} />
              ) : (
                <AccountBalanceWalletRoundedIcon fontSize="small" />
              )}
              <Typography className="time-slot">
                {isLoading ? (
                  <Skeleton variant="text" width={50} />
                ) : (
                  fCurrency(Number(item?.salePrice || item?.price)).slice(0, -2)
                )}
              </Typography>
              {isLoading ? (
                <Skeleton variant="circular" width={20} height={20} />
              ) : (
                <DateRangeRoundedIcon fontSize="small" />
              )}
              <Typography className="date">
                {isLoading ? (
                  <Skeleton variant="text" width={50} />
                ) : (
                  fDateShort(item.createdAt)
                )}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: "right" }}>
          {isLoading ? (
            <Skeleton variant="text" width="100px" sx={{ ml: "auto" }} />
          ) : (
            <Rating
              name="text-feedback"
              size="small"
              value={item.totalRating / item.totalReview}
              readOnly
              precision={0.5}
            />
          )}
          <Box className="phone-container">
            {isLoading ? (
              <Skeleton variant="text" width={50} />
            ) : (
              <Label
                variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                color={
                  (item?.available < 1 && "error") ||
                  (item?.available < 20 && "warning") ||
                  (item?.available >= 20 && "success") ||
                  "primary"
                }
              >
                {(item?.available < 1 && "Out of stock") ||
                  (item?.available < 20 && "Low stock") ||
                  (item?.available >= 20 && "In stock")}
              </Label>
            )}

            {isLoading ? (
              <Skeleton variant="circular" width={30} height={30} />
            ) : (
              <IconButton
                className="btn-phone"
                size="small"
                onClick={!isLoading && handleClickOpen(item._id)}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
