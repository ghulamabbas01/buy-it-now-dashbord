// react router dom
import { useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
  Link,
  Alert,
} from "@mui/material";
// components
import { LoginForm, Page } from "src/components";
//  hooks
import { Link as RouterLink } from "react-router-dom";
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

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const { isAuthenticated } = useSelector((state) => state.settings);
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <RootStyle title={`Login | ${process.env.REACT_APP_DOMAIN_NAME}`}>
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
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack>
            <Typography textAlign="center" mb={1} variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography
              sx={{ color: "text.secondary", mb: 5 }}
              textAlign="center"
            >
              {t("login-to-your-account-to-continue")}
            </Typography>

            <Alert severity="primary" sx={{ mb: 3 }}>
              {t("email")}: <strong>test@commercehope.com</strong>
              <br />
              {t("password")}: <strong>test1234</strong>
            </Alert>
          </Stack>
          <LoginForm />
          <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
            {t("don't-have-an-account?")}&nbsp;
            <Link component={RouterLink} to="/auth/register">
              {t("get-started")}
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
