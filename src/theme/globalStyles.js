// material
import { useTheme, alpha } from "@mui/material/styles";
import { GlobalStyles as GlobalThemeStyles } from "@mui/material";
import { fontFamily } from "@mui/system";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();
  const isRTL = theme.direction === "rtl";
  const background = {
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.main, 0.72),
  };
  return (
    <GlobalThemeStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        iframe: {
          pointerEvents: "none",
        },
        body: {
          width: "100%",
          height: "100%",

          fontFamily: isRTL
            ? "'Noto Kufi Arabic', sans-serif"
            : "'Poppins', sans-serif",
        },
        "#__next": {
          width: "100%",
          height: "100%",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        textarea: {
          "&::-webkit-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::-moz-placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          "&:-ms-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::placeholder": {
            color: theme.palette.text.disabled,
          },
        },
        "&.apexcharts-canvas": {
          // Tooltip
          ".apexcharts-xaxistooltip": {
            ...background,
            border: 0,
            boxShadow: theme.customShadows.z24,
            color: theme.palette.text.primary,
            borderRadius: theme.shape.borderRadiusSm,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(theme.palette.background.default, 0.72),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...background,
            border: 0,
            boxShadow: theme.customShadows.z24,
            borderRadius: theme.shape.borderRadiusSm,
            "& .apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              // backgroundColor: theme.palette.grey[500 _16],
              color:
                theme.palette.text[
                  theme.palette.mode === "light" ? "secondary" : "primary"
                ],
            },
          },
          // Legend
          ".apexcharts-legend": {
            padding: 0,
            textTransform: "capitalize",
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
            fontSize: "12px!important",
          },
        },
      }}
    />
  );
}
