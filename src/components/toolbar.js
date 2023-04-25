import * as React from "react";
// material
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";

export default function ButtonAppBar({ children }) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: 1,
          mb: 2,
          display: { sm: "block", xs: "none" },
        }}
      >
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            boxShadow: "none",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.72),
            top: { lg: 61, xs: 65 },
            width: { lg: "calc(100% - 220px)", xs: "100%" },
            right: 0,
            borderBottom: (theme) => "1px solid " + theme.palette.divider,
          }}
        >
          <Toolbar sx={{ minHeight: 48 }}>{children}</Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: { sm: "none", xs: "block" },
        }}
      >
        {children}
      </Box>
    </>
  );
}
