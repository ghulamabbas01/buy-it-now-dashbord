import React from "react";
import { uniqueId } from "lodash";
// material
import {
  Grid,
  Paper,
  Typography,
  Skeleton,
  Box,
  Stack,
  Link,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Label } from "src/components";
import { fDateShort } from "src/utils/formatTime";
import { capitalize } from "lodash";

import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { Link as RouterLink } from "react-router-dom";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
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
    alignItems: "end",
    flexDirection: "column",
    justifyContent: "center",
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

export default function AgendaCodeMobile({ item, isLoading, handleClickOpen }) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        borderLeft: `6px solid ${
          isLoading
            ? theme.palette.divider
            : theme.palette[
                (item?.status === "active" && "success") ||
                  (item?.status === "deactive" && "error") ||
                  "info"
              ].main
        }`,
      }}
      key={uniqueId()}
    >
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Stack spacing={0.5}>
            <Link
              className="name"
              component={RouterLink}
              to={`/users/${item?._id}`}
              underline="none"
            >
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                capitalize(item.fullName)
              )}
            </Link>
            <Stack spacing={1} direction="row" alignItems="center">
              {isLoading ? (
                <Skeleton variant="circular" width={20} height={20} />
              ) : (
                <EmailRoundedIcon fontSize="small" />
              )}
              <Typography className="time-slot">
                {isLoading ? (
                  <Skeleton variant="text" width={50} />
                ) : (
                  item?.email
                )}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              {isLoading ? (
                <Skeleton variant="circular" width={20} height={20} />
              ) : (
                <PhoneAndroidRoundedIcon fontSize="small" />
              )}
              <Typography className="date">
                {isLoading ? (
                  <Skeleton variant="text" width={50} />
                ) : (
                  item?.phone
                )}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Box className="phone-container">
            <Stack direction="row" alignItems={"center"} gap={0.8}>
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
            {isLoading ? (
              <Skeleton variant="text" width={50} />
            ) : (
              <Label
                variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                color={
                  (item?.status === "active" && "success") ||
                  (item?.status === "deactive" && "error") ||
                  "info"
                }
              >
                {capitalize(item?.status)}
              </Label>
            )}
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
