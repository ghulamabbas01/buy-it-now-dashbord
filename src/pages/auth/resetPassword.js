import React from "react";
import { Link } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography, Card } from "@mui/material";
// components
import { ResetPasswordForm, Page } from "src/components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: 60,
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const navigate = useNavigate();
  const {t} = useTranslation("login")
  const { isAuthenticated } = useSelector((state) => state.settings);
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <RootStyle title={`Reset Password | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Box
        sx={{
          bgcolor: "primary.main",
          width: "100%",
          borderRadius: "0 0 40px 40px",
          px: 6,
          pt: 6,
          pb: 16,
        }}
      >
        <Typography
          textAlign="center"
          variant="h3"
          fontWeight={300}
          lineHeight={0.7}
          color="primary.contrastText"
        >
          {t("welcome-to-the")}
        </Typography>
        <Typography
          textAlign="center"
          variant="h2"
          color="primary.contrastText"
        >
          {t("commercehope")}
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          lineHeight={0.9}
          color="primary.contrastText"
        >
          {t("reactjs-ecommerce-script-you-need")}
        </Typography>
      </Box>
      <Container>
        <Card sx={{ maxWidth: 560, mx: "auto", p: 4, mt: "-80px" }}>
          <>
            <Typography textAlign="center" mb={1} variant="h4" gutterBottom>
              {t("reset-password")}
            </Typography>
            <Typography
              sx={{ color: "text.secondary", mb: 5 }}
              textAlign="center"
              lineHeight={0.9}
            >
              {t("Update-your-password-to-login-your-account")}
            </Typography>
            <ResetPasswordForm />
            <Button
              fullWidth
              size="large"
              component={Link}
              to="/auth/login"
              sx={{ mt: 1 }}
            >
              {t("back")}
            </Button>
          </>
        </Card>
      </Container>
    </RootStyle>
  );
}
