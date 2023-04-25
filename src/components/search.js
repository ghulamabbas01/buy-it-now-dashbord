import { useState, useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// material
import { styled } from "@mui/material/styles";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import { useSearchParams } from "react-router-dom";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  maxHeight: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 1),
  },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 190,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),

  "&.Mui-focused": { width: 230, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    // borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  [theme.breakpoints.down("sm")]: {
    width: 150,
    "&.Mui-focused": { width: 150 },
  },
}));

// ----------------------------------------------------------------------

export default function ProductListToolbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const usedSearch = searchParams.get("search");
  const [search, setSearch] = useState(usedSearch || "");
  const onChange = (e) => {
    const val = e.target.value;
    setSearch(val);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (Boolean(search)) {
        searchParams.set("search", search);
        searchParams.delete("page");
        setSearchParams(searchParams);
      } else {
        searchParams.delete("search");
        searchParams.delete("page");
        setSearchParams(searchParams);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    
  }, [search]);

  return (
    <RootStyle>
      <SearchStyle
        size="small"
        value={search}
        onChange={onChange}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: "text.disabled" }} />
          </InputAdornment>
        }
      />
    </RootStyle>
  );
}
