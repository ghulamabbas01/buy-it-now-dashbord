// material-ui components
import { Card } from "@mui/material";
import {
  HeaderBreadcrumbs,
  Table,
  OrderRow,
  Toolbar,
  Page,
  ProfileCover,
  OrderCard,
} from "src/components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import * as api from "src/services";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "product", alignRight: false },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "inventoryType", label: "status", alignRight: false, sort: true },
  { id: "price", label: "price", alignRight: false, sort: true },
  { id: "quantity", label: "quantity", alignRight: false },
  { id: "", label: "actions", alignRight: true },
];
export default function UserProfile() {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const { id } = useParams();
  const { t } = useTranslation("user");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    ["user-details", id, pageParam],
    () => api.getUser(id + `?page=${pageParam || 1}`),
    {
      enabled: Boolean(id),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const user = (function () {
    if (isLoading) {
      return null;
    } else {
      const { user } = data?.data;
      return user;
    }
  })();
  const orders = (function () {
    if (isLoading) {
      return null;
    } else {
      const { orders } = data?.data;
      return orders;
    }
  })();
  const tableData = { data: orders, count: data?.data.count };

  return (
    <Page title={`User Profile | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Users List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("users"),
              href: "/users",
            },
            {
              name: t("details"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover data={user} />
      </Card>

      <Table
        headData={TABLE_HEAD}
        data={tableData}
        isLoading={isLoading}
        row={OrderRow}
        isUser
        mobileRow={OrderCard}
      />
    </Page>
  );
}
