// material
import { styled } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { capitalize } from "lodash";
import { fDateShort } from "src/utils/formatTime";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));

export default function OrderRow({ isLoading, row, handleClickOpen }) {
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
          ) : row.cover ? (
            <ThumbImgStyle alt={row?.name} src={row?.cover?.url} />
          ) : (
            <Avatar color="primary" sx={{ mr: 1 }}>
              {" "}
              {row?.name.slice(0, 1)}{" "}
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
              row?.name
            )}{" "}
          </Typography>{" "}
        </Box>{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 160 }}>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row?.email}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 40 }}>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row.phone}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 40 }} align="right">
        {" "}
        {isLoading ? <Skeleton variant="text" /> : capitalize(row.role)}{" "}
      </TableCell>{" "}
      <TableCell style={{ minWidth: 40 }} align="right">
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateShort(row.createdAt, language !== "ar" ? enUS : ar)
        )}{" "}
      </TableCell>
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
          ) : row.role !== "Owner" ? (
            <Tooltip title="Delete">
              <IconButton onClick={handleClickOpen(row._id)}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Locked">
              <IconButton>
                <LockIcon />
              </IconButton>
            </Tooltip>
          )}{" "}
        </Stack>{" "}
      </TableCell>{" "}
    </TableRow>
  );
}
