import React from "react";
// material
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
// components
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Label } from "src/components";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "src/utils/formatTime";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  border: "1px solid " + theme.palette.divider,
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function OrderRow({ isLoading, row, isUser }) {
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
            <Skeleton
              variant="rectangular"
              width={50}
              height={50}
              sx={{ borderRadius: 1 }}
            />
          ) : row.items.length > 0 ? (
            <ThumbImgStyle
              alt={row.items[0].fullName}
              src={row.items[0].cover}
            />
          ) : (
            <Avatar> {row.user.fullName} </Avatar>
          )}{" "}
          <Typography variant="subtitle2" noWrap>
            {" "}
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : !isUser ? (
              row.user.fullName
            ) : (
              row.items[0].name
            )}{" "}
          </Typography>{" "}
        </Box>{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <> {fDateTime(row.createdAt, language !== "ar" ? enUS : ar)} </>
        )}{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              (row?.status === "delivered" && "success") ||
              (row?.status === "ontheway" && "warning") ||
              (row?.status === "pending" && "info") ||
              "error"
            }
          >
            {row.status}{" "}
          </Label>
        )}{" "}
      </TableCell>
      <TableCell>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          `${row.currency || "US$"} ${row.total}`
        )}{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row.items.length}{" "}
      </TableCell>
      <TableCell align="right">
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
              <IconButton onClick={() => navigate(`/orders/${row._id}`)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          )}{" "}
        </Stack>{" "}
      </TableCell>{" "}
    </TableRow>
  );
}
