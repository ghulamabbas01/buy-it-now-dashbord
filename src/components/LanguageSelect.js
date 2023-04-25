import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import MenuPopover from "src/components/menuPopover";

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");
  const { language: locale, changeLanguage } = i18n;
  const [selectedLocale, setSelectedLocale] = React.useState(locale);
  const anchorRefLocale = React.useRef(null);
  const [openLocale, setOpenLocale] = React.useState(false);
  const handleOpenLocale = () => {
    setOpenLocale(true);
  };

  const handleCloseLocale = () => {
    setOpenLocale(false);
  };

  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          ...(openLocale && {
            color: "primary.main",
          }),
          "&:hover": {
            color: "primary.main",
          },
        }}
        ref={anchorRefLocale}
        onClick={handleOpenLocale}
      >
        {selectedLocale === "ar" ? "عربي" : "English"}
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
      </Typography>
      <MenuPopover
        open={openLocale}
        onClose={handleCloseLocale}
        anchorEl={anchorRefLocale.current}
        sx={{
          width: 300,
          border: (theme) => "1px solid " + theme.palette.divider,
        }}
      >
        <Stack sx={{ py: 2, px: 2.5 }}>
          <Typography variant="h6" color="text.primary">
            {t("select-language")}
          </Typography>
        </Stack>
        <Divider />
        <List>
          {[
            {
              name: "English",
              key: "en",
              countryCode: "uk",
            },
            { name: "عربي", key: "ar", countryCode: "sa" },
          ].map((item) => (
            <ListItem
              key={item.key}
              disablePadding
              onClick={() => {
                handleCloseLocale();
                setSelectedLocale(item.key);
                changeLanguage(item.key);
              }}
              sx={{
                ...(locale === item.key && {
                  bgcolor: "background.neutral",
                  position: "relative",
                }),
                span: { fontWeight: 500 },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src={`/icons/flags/${item.countryCode}.png`}
                    alt="uk"
                    width={24}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      {item.name}
                      {locale === item.key && (
                        <FileDownloadDoneRoundedIcon
                          sx={{
                            color: "primary.main",
                            position: "absolute",
                            top: 8,
                            right: 12,
                          }}
                        />
                      )}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MenuPopover>
    </Box>
  );
}
