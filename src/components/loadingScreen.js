// material
import { useTheme } from "@mui/material/styles";
//
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const { isAuthenticated } = useSelector((state) => state.settings);
  const theme = useTheme();
  return (
    <>
      <Backdrop
        className="backdrop-loading"
        sx={{
          ...(isAuthenticated && {
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: { md: 61, xs: 65 },
            left: { md: 220, xs: 0 },
          }),
        }}
        open={true}
      >
        <Box width="300px">
          <LinearProgress
            color={theme.palette.mode === "dark" ? "inherit" : "secondary"}
          />
        </Box>
      </Backdrop>
    </>
  );
}
