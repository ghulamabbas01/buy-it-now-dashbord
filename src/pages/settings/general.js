import { useState } from "react";
import PropTypes from "prop-types";
// mui
import { Tabs, Tab, Box, Card, Typography } from "@mui/material";
// components
import {
  AccountGeneral,
  AccountChangePassword,
  Toolbar,
  HeaderBreadcrumbs,
  Roles,
  Page,
  AddRole,
} from "src/components";
import { useTranslation } from "react-i18next";

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

export default function Settings() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("setting");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(data)
  return (
    <Page title={`Settings | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Box sx={{ m: "0 -16px" }}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Users List"
            links={[
              {
                name: t("dashboard"),
                href: "/dashboard",
              },
              {
                name: t("general-settings"),
                href: "",
              },
            ]}
          />
        </Toolbar>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "-18px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
          >
            <Tab label={t("profile-setting")} {...a11yProps(0)} />
            <Tab label={t("roles")} {...a11yProps(1)} />
            <Tab label={t("add-role")} {...a11yProps(2)} />

            <Tab label={t("change-password")} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AccountGeneral />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Roles />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h3" color="text.primary" mb={3}>
              {t("add-role")}
            </Typography>
            <AddRole />
          </Card>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <AccountChangePassword />
        </TabPanel>
      </Box>
    </Page>
  );
}
