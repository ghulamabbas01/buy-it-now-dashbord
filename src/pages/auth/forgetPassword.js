import React, { useState } from "react";
// react query
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
// // react router dom
import { Link } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography, Card, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { ForgetPasswordForm, Page } from "src/components";
// notification
import toast from 'react-hot-toast';
// api
import * as api from "src/services";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: 60,
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { t } = useTranslation("login");

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.settings);
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: (err) => {
      setloading(false);
      toast.success("Email Resent!");
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message ? JSON.parse(message) : "Something went wrong!");
    },
  });

  return (
    <RootStyle title={`Forget Password | ${process.env.REACT_APP_DOMAIN_NAME}`}>
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
          variant="body2"
          color="primary.contrastText"
          lineHeight={0.9}
        >
          {t("reactjs-ecommerce-script-you-need")}
        </Typography>
      </Box>
      <Container>
        <Card sx={{ maxWidth: 560, mx: "auto", p: 4, mt: "-80px" }}>
          {!sent ? (
            <>
              <Stack>
                <Typography textAlign="center" variant="h4" gutterBottom>
                  {t("forgot-your-password?")}
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", mb: 5 }}
                  textAlign="center"
                >
                  {t("please-enter-the-email-address-associated-with-your-account-and-We-will-email-you-a-link-to-reset-your-password.")}
                </Typography>
              </Stack>

              <ForgetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />

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
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                Request sent successfully!
              </Typography>
              <Typography mb={5}>
                We have sent a link to &nbsp;<strong>{email}</strong>.
                <br />
                Please check your email.
              </Typography>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
                onClick={() => mutate(email)}
              >
                Resend
              </LoadingButton>
              <Button
                size="large"
                fullWidth
                component={Link}
                to="/auth/login"
                sx={{ mt: 1 }}
              >
                {t("back")}
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </RootStyle>
  );
}
