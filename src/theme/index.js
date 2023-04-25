import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import { useSelector } from "react-redux";
import useDirection from "src/hooks/useDirection";
// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const { mode: themeMode } = useSelector((state) => state.settings);
  const themeDirection = useDirection();
  const isLight = themeMode === "light";
  const FONT_PRIMARY = ["'Poppins', sans-serif"]; // Google Font
  const FONT_SECONDARY = ["'Noto Kufi Arabic', sans-serif"]; // Google Font

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shape,
      typography: {
        ...typography,
        fontFamily: themeDirection === "rtl" ? FONT_SECONDARY : FONT_PRIMARY,
      },
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
