// material
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import { Label } from "src/components";
import { useNavigate } from "react-router-dom";

import { capitalize } from "lodash";
import { fDateTime } from "src/utils/formatTime";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 40,
  height: 40,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function UserRow({ isLoading, row }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { language } = i18n;
  return (
    <TableRow hover key={Math.random()}>
      <TableCell component="th" scope="row" padding="none">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : row.avatar ? (
            <ThumbImgStyle alt={row?.fullName} src={row?.avatar?.url} />
          ) : (
            <Avatar color="primary" sx={{ mr: 1 }}>
              {" "}
              {row?.fullName.slice(0, 1)}{" "}
            </Avatar>
          )}{" "}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ textTransform: "capitalize" }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.firstName
            )}{" "}
          </Typography>{" "}
        </Box>{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 160 }}>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row?.email}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 80 }}>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row?.phone}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 40 }}>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={row?.status === "active" ? "success" : "error"}
          >
            {capitalize(row?.status)}{" "}
          </Label>
        )}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 40 }}>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateTime(row.createdAt, language !== "ar" ? enUS : ar)
        )}{" "}
      </TableCell>{" "}
      <TableCell>
        <Stack direction="row" justifyContent="flex-end">
          {" "}
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
          ) : (
            <Tooltip title="Preview">
              <IconButton onClick={() => navigate(`/users/${row?._id}`)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          )}{" "}
        </Stack>{" "}
      </TableCell>{" "}
    </TableRow>
  );
}
