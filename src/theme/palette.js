import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}
// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const PRIMARY = {
  lighter: "#F25E97",
  light: "#F53D83",
  main: "#FF2678",
  dark: "#E01B66",
  darker: "#C70851",
  contrastText: "#fff",
};
const SECONDARY = {
  lighter: "#5E01A7",
  light: "#7200CC",
  main: "#3F0071",
  dark: "#34005C",
  darker: "#29004A",
  contrastText: "#fff",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};
const WARNING = {
  lighter: "#FC7303",
  light: "#FD811C",
  main: "#ED6C02",
  dark: "#CA5C02",
  darker: "#B15102",
  contrastText: GREY[800],
};
const ERROR = {
  lighter: "#D74242",
  light: "#DB5757",
  main: "#D33131",
  dark: "#BD2828",
  darker: "#931F1F",
  contrastText: "#fff",
};

// GRADIENTS

const GRADIENTS = {
  primary: `linear-gradient(to right bottom, ${PRIMARY.main}, ${PRIMARY.darker} 120%)`,
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

// CHART_COLORS
const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

// COMMON
const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  chart: CHART_COLORS,
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

// palette
const palette = {
  light: {
    ...COMMON,
    divider: GREY[400],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#fff", default: "#F3F4F8", neutral: "#F3F4F8" },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    divider: GREY[700],
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: { paper: "#162031", default: "#0F172B", neutral: "#0F172B" },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
