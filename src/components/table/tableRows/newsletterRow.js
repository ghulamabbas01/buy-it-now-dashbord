import React from "react";
// material
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
// components
import { fDateTime } from "src/utils/formatTime";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

export default function NewsletterRow({ isLoading, row, onClickCopy }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  return (
    <TableRow hover key={Math.random()}>
      <TableCell component="th" scope="row" padding="none">
        <Box>
          <Typography variant="subtitle2" noWrap>
            {" "}
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row.email
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
      <TableCell align="right">
        {" "}
        {isLoading ? (
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ ml: "auto" }}
          />
        ) : (
          <Tooltip title="Copy Email">
            <IconButton
              aria-label="copy"
              onClick={() => {
                navigator.clipboard.writeText(row.email);
                onClickCopy();
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        )}{" "}
      </TableCell>{" "}
    </TableRow>
  );
}
