import { motion } from "framer-motion";

// material
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "src/components";
import { NoDataIllustration } from "src/assets";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
}));

// ----------------------------------------------------------------------

export default function NoData() {
  return (
    <RootStyle>
      <MotionContainer initial="initial" open>
        <Box
          sx={{
            maxWidth: { md: 450, xs: 340 },
            margin: "auto",
            textAlign: "center",
            pb: 3,
            svg: {
              width: { md: 450, xs: 340 },
              height: { md: 450, xs: 340 },
            },
          }}
        >
          <motion.div variants={varBounceIn}>
            <NoDataIllustration />
          </motion.div>
        </Box>
      </MotionContainer>
    </RootStyle>
  );
}
