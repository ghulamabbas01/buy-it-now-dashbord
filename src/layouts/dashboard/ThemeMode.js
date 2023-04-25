import { IconButton } from "@mui/material";
// hooks
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "src/redux/slices/settings";
// ----------------------------------------------------------------------

export default function SettingMode() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.settings);

  return (
    <IconButton
      aria-label="theme-mode"
      color={mode === "dark" ? "warning" : "primary"}
      onClick={() => dispatch(setThemeMode(mode === "dark" ? "light" : "dark"))}
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
