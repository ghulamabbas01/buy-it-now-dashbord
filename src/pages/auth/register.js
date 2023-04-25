// import RouterLink from "src/utils/link";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// components
import { Page, RegisterForm } from "src/components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: 60,
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  maxWidth: 560,
  margin: "auto",
  marginTop: "-80px",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(3, 3),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const { isAuthenticated } = useSelector((state) => state.settings);
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <RootStyle title="Register | Minimal-UI">
      <Box
        sx={{
          background: (theme) => theme.palette.gradients.primary,
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
          lineHeight={1}
          color="primary.contrastText"
          sx={{ color: "primary.contrastText" }}
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
          lineHeight={1.2}
          color="primary.contrastText"
        >
          {t("reactjs-ecommerce-script-you-need")}
        </Typography>
      </Box>
      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom textAlign="center">
            {t("get-started")}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", mb: 5 }}
            textAlign="center"
          >
            {t("free-forever.-no-credit-card-needed.")}
          </Typography>
          <RegisterForm />
          <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
           {t("already-have-an-account?")}&nbsp;
            <Link component={RouterLink} to="/auth/login">
              {t("login")}
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
