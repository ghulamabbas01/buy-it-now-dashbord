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
  Avatar,
  Link,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Label } from "src/components";
import { fDateShort } from "src/utils/formatTime";
import { capitalize } from "lodash";
// import { Lable, Popover } from "src/components";
// import Icon from "src/utils/icon";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link as RouterLink } from "react-router-dom";
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
  objectFit: "cover",
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
                item?.status.toLowerCase() === "active" ? "success" : "error"
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
              <ThumbImgStyle alt={item?.name} src={item?.cover.url} />
            ) : (
              <Avatar>{item.name.slice(0, 1)}</Avatar>
            )}
            <Link
              className="name"
              component={RouterLink}
              to={`/categories/sub-categories/${item?._id}`}
              underline="none"
              noWrap
            >
              {isLoading ? <Skeleton variant="text" /> : capitalize(item.name)}
            </Link>
            <Stack flexDirection="row" alignItems="center" gap={"6px"}>
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

        <Grid item xs={4}>
          <Box className="phone-container">
            {isLoading ? (
              <Skeleton variant="text" width={50} />
            ) : (
              <Label
                variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                color={
                  item?.status?.toLowerCase() === "active" ? "success" : "error"
                }
              >
                {capitalize(item?.status)}
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
