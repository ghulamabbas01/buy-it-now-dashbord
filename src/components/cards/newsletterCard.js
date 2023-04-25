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
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { fDateShort } from "src/utils/formatTime";
// import { Lable, Popover } from "src/components";
// import Icon from "src/utils/icon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const RootStyle = styled(Paper)(({ theme }) => ({
  padding: "10px 10px 10px 16px",
  marginBottom: "0.5rem",
  backgroundColor: theme.palette.background.paper,
  border: "1px solid " + theme.palette.divider,
  borderRadius: 4,

  "& .phone-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "0.5rem",
  },
}));

export default function NewsLetterCard({ item, isLoading, onClickCopy }) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        borderLeft: `6px solid ${
          isLoading ? theme.palette.divider : theme.palette.primary.main
        }`,
      }}
      key={uniqueId()}
    >
      <Grid container alignItems="center">
        <Grid item md={8} sm={8} xs={8}>
          <Typography variant="subtitle1">
            {isLoading ? <Skeleton variant="text" width={200} /> : item.email}
          </Typography>
          <Typography variant="body1">
            {isLoading ? (
              <Skeleton variant="text" width={200} />
            ) : (
              fDateShort(item.createdAt)
            )}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Box className="phone-container">
            {isLoading ? (
              <Skeleton variant="circular" width={30} height={30} />
            ) : (
              <Tooltip title="Copied Email">
                <IconButton
                  className="btn-phone"
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(item.email);
                    onClickCopy();
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
