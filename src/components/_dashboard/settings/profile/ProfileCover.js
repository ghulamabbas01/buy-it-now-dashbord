// material
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
//
import { MyAvatar } from "src/components";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    top: 0,
    zIndex: 9,
    width: "100%",
    content: "''",
    height: "100%",
    position: "absolute",
    background: `linear-gradient(to right bottom,${theme.palette.primary.main} , ${theme.palette.primary.darker} 120%)`,
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const CoverImgStyle = styled("div")({
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function ProfileCover({ data }) {
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          data={data}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{data?.fullName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{data?.email}</Typography>
        </Box>
      </InfoStyle>
      <CoverImgStyle />
    </RootStyle>
  );
}
