import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  const varLow = alpha(theme.palette.grey[900], 0.48);
  const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
          backgroundColor: alpha(theme.palette.background.default, 0.72),

          "&.MuiBackdrop-invisible": {
            background: "transparent",
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)", // Fix on Mobile
          },
          // "&.backdrop-loading": {
          //   background: theme.palette.background.paper,
          // },
        },
      },
    },
  };
}
