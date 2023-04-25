import React from "react";
// material
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  Stack,
} from "@mui/material";
import { Pagination } from "src/components";
import TableHead from "./tableHead";
import NotData from "src/pages/noData";
// ----------------------------------------------------------------------

export default function CustomTable({ ...props }) {
  const {
    type,
    headData,
    data,
    isLoading,
    mobileRow,
    row,
    rows,
    hiddenPagination,
    ...rest
  } = props;

  const Component = row;
  const CardComponent = mobileRow;
  return (
    <>
      {!isLoading && data?.data.length === 0 ? (
        <NotData />
      ) : (
        <>
          <Card sx={{ display: { sm: "block", xs: "none" } }}>
            <TableContainer>
              <Table sx={{ minWidth: 800, overflow: "auto" }}>
                <TableHead headData={headData} />
                <TableBody>
                  {(isLoading
                    ? Array.from(new Array(rows || 6))
                    : data?.data
                  ).map((item) => {
                    return (
                      <Component
                        key={Math.random()}
                        row={item}
                        isLoading={isLoading}
                        {...rest}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {mobileRow && (
            <Box sx={{ display: { sm: "none", xs: "block" } }}>
              {(isLoading ? Array.from(new Array(6)) : data.data).map((row) => (
                <CardComponent
                  key={Math.random()}
                  item={row}
                  isLoading={isLoading}
                  {...rest}
                />
              ))}
            </Box>
          )}

          {!isLoading && !hiddenPagination && (
            <Stack alignItems="flex-end" mt={2} pr={2}>
              <Pagination data={data} />
            </Stack>
          )}
        </>
      )}
    </>
  );
}
