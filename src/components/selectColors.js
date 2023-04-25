import { useState, useEffect } from "react";
// material
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Zoom,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function ColorsFilter({ colors, addColor, selectedColors }) {
  const [state, setstate] = useState({
    colors: [],
  });

  const handleChange = (props, e) => {
    var data = state.colors;
    if (e.target.checked) {
      data = [...data, props];
      setstate({ ...state, colors: [...state.colors, props] });
      addColor([...state.colors, props]);
    } else {
      const index = data.indexOf(props);
      data.splice(index, 1);
      if (data.length > 0) {
        const filtered = state.colors.filter((colors) => colors !== props);
        setstate({ ...state, colors: filtered });
        addColor(filtered);
      }
    }
  };
  useEffect(() => {
    setstate({ ...state, colors: selectedColors });
  }, [selectedColors]);
  return (
    <>
      <Grid container>
        {colors.map((v) => (
          <Grid key={Math.random()} item xs={6}>
            <FormGroup>
              <FormControlLabel
                sx={{ textTransform: "capitalize" }}
                name="colors"
                checked={state.colors.includes(v)}
                onChange={(e) => handleChange(v, e)}
                control={
                  <Checkbox
                    sx={{
                      color: v,
                      svg: {
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: "50%",
                      },

                      "&.Mui-checked": { color: v },
                    }}
                    icon={<CircleIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    {...label}
                  />
                }
                label={v}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
      <Zoom in={state.colors.length > 0}>
        <Button
          onClick={() => {
            setstate({ ...state, colors: [] });
          }}
          variant="outlined"
          color="primary"
          colors="small"
          sx={{ float: "right", mt: "-3px" }}
        >
          reset
        </Button>
      </Zoom>
    </>
  );
}
