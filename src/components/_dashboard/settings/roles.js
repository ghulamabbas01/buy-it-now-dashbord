import { useState } from "react";
import * as api from "src/services";
import { useQuery } from "react-query";
import { Container, Dialog } from "@mui/material";
// components
import {
  HeaderBreadcrumbs,
  Toolbar,
  RolesCard,
  Table,
  RolesRow,
  DeleteDialog,
} from "src/components";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "src/redux/slices/settings";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "name", sort: true },
  { id: "email", label: "email", sort: true },
  { id: "phone", label: "phone", sort: true },
  { id: "role", label: "role", sort: true },
  { id: "joined", label: "joined" },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function Roles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.settings);
  const [apicall, setApicall] = useState(false);
  const { data, isLoading } = useQuery(["roles", apicall], api.getRoles, {
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong!", {
        variant: "error",
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onApiCall = () => {
    setApicall(!apicall);
    if (user._id === id) {
      localStorage.removeItem("token");
      dispatch(setLogout());
      navigate("/auth/login");
    }
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={onApiCall}
          endPoint="deleteRole"
          type="Role"
        />
      </Dialog>
      <Container maxWidth={"lg"}>
        <Table
          headData={TABLE_HEAD}
          data={data}
          isLoading={isLoading}
          row={RolesRow}
          mobileRow={RolesCard}
          handleClickOpen={handleClickOpen}
          hiddenPagination
        />
      </Container>
    </>
  );
}
