import React from "react";
// material
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { fDateShort } from "src/utils/formatTime";
import Label from "src/components/label";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 60,
  height: 60,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function CategoryRow({ isLoading, row, handleClickOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
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
              width={60}
              height={60}
              sx={{ borderRadius: 1 }}
            />
          ) : (
            <ThumbImgStyle
              alt={row?.heading}
              src={row?.cover?.url}
              className="lazyload"
            />
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : row?.heading.length > 30 ? (
              row?.heading.slice(0, 30) + "..."
            ) : (
              row?.heading
            )}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : row.description.length > 40 ? (
          row.description.slice(0, 40) + "..."
        ) : (
          row.description
        )}
      </TableCell>

      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <>{fDateShort(row.createdAt)}</>
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={row?.enabled ? "success" : "error"}
          >
            {row?.enabled ? "Enabled" : "Disabled"}
          </Label>
        )}
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                width={34}
                height={34}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="circular" width={34} height={34} />
            </>
          ) : (
            <>
              <IconButton
                onClick={() =>
                  navigate(`/settings/application/slides/${row?._id}`)
                }
              >
                <EditRoundedIcon />
              </IconButton>
              <IconButton onClick={handleClickOpen(row._id)}>
                <DeleteRoundedIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
