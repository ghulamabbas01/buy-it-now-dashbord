import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// mui
import { Tabs, Tab, Box } from "@mui/material";
// components
import {
  Toolbar,
  HeaderBreadcrumbs,
  UserNotifications,
  Page,
} from "src/components";
import HomeSlides from "./homeSlides";
import HomeBanners from "./homeBanners";
import { useSearchParams } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabIndex = searchParams.get("tab-index");
  const [value, setValue] = useState(0);
  const [data, setData] = useState(false);
  const { t } = useTranslation("setting");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchParams({
      "tab-index": newValue,
    });
  };
  useEffect(() => {
    setValue(Number(tabIndex) || 0);
  }, []);
  return (
    <Page title={`Settings | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Box className="application" sx={{ m: "0 -16px" }}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Users List"
            links={[
              {
                name: t("dashboard"),
                href: "/dashboard",
              },
              {
                name: t("app-setting"),
                href: "",
              },
            ]}
            action={
              value !== 2 && !data
                ? {
                    href: `/settings/application/home-banners/edit`,
                    title: t("add-home-banner"),
                    icon: <AddIcon />,
                  }
                : {
                    href: `/settings/application/home-banners/edit`,
                    title: t("edit-home-banner"),
                    icon: <EditRoundedIcon />,
                  }
            }
          />
        </Toolbar>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "-18px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
          >
            <Tab label={t("home-slides")} {...a11yProps(0)} />
            <Tab label={t("home-banners")} {...a11yProps(1)} />

            <Tab label={t("notifications")} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HomeSlides />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HomeBanners setData={(v) => setData(v)} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserNotifications />
        </TabPanel>
      </Box>
    </Page>
  );
}
