// material
import { alpha } from "@mui/material/styles";
import { Box, Card, Typography, Button, Skeleton } from "@mui/material";
// icon
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
// ----------------------------------------------------------------------
import { useTranslation } from "react-i18next";

export default function DailyVisters({ data, isLoading }) {
    const { t } = useTranslation("home");
  return (
    <Card sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">
            {isLoading ? (
              <Skeleton variant="text" width="100px" />
            ) : (
              t("total-product")
            )}
          </Typography>
          <Typography variant="h4">
            {isLoading ? <Skeleton variant="text" width="100px" /> : data}
          </Typography>
        </Box>
        <Button
          sx={{
            display: "block",
            minWidth: 50,
            lineHeight: 0,
            minHeight: 50,
            padding: 0,

            background: (theme) => alpha(theme.palette.primary.main, 0.9),
          }}
          variant="contained"
          color="primary"
        >
          <StoreRoundedIcon />
        </Button>
      </>
    </Card>
  );
}
