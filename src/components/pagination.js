import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
export default function PaginationRounded({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const usedSearch = searchParams.get("page");
  const [page, setPage] = React.useState(+usedSearch || 1);
  const handleChange = (event, value) => {
    setPage(value);
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };
  return (
    <Stack spacing={2} mt={2} pr={2}>
      <Pagination
        count={data?.count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{ m: { sm: "0 0 0 auto", xs: " 0 auto" }, mb: 3 }}
      />
    </Stack>
  );
}
