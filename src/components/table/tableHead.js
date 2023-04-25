import PropTypes from "prop-types";
// material
import { TableRow, TableCell, TableHead } from "@mui/material";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

ProductListHead.propTypes = {
  headData: PropTypes.array,
};

export default function ProductListHead({ headData }) {
  const { t } = useTranslation("common");
  return (
    <TableHead>
      <TableRow
        sx={{
          background: (theme) => theme.palette.primary.main,
        }}
      >
        {headData.map((headCell) => (
          <TableCell
            key={Math.random()}
            align={headCell.alignRight ? "right" : "left"}
            sx={{
              color: "common.white",
              bgcolor: "transparent",
            }}
          >
            {t(headCell.label)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
