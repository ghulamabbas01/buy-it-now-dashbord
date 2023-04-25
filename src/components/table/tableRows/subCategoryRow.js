import React from "react";
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
  Tooltip,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { fDateShort } from "src/utils/formatTime";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function CategoryRow({ isLoading, row, handleClickOpen }) {
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
          {" "}
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={50}
              height={50}
              sx={{ borderRadius: 1 }}
            />
          ) : (
            <ThumbImgStyle alt={row?.name} src={row?.cover?.url} />
          )}{" "}
          <Typography variant="subtitle2" noWrap>
            {" "}
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.name
            )}{" "}
          </Typography>{" "}
        </Box>{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          capitalize(row.parentCategory)
        )}{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? <Skeleton variant="text" /> : row.totalItems}{" "}
      </TableCell>{" "}
      <TableCell>
        {" "}
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <>{fDateShort(row.createdAt, language !== "ar" ? enUS : ar)} </>
        )}{" "}
      </TableCell>{" "}
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {" "}
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                width={34}
                height={34}
                sx={{ mr: 1 }}
              />{" "}
              <Skeleton variant="circular" width={34} height={34} />{" "}
            </>
          ) : (
            <>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() =>
                    navigate(`/categories/sub-categories/${row?._id}`)
                  }
                >
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen(row._id)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
