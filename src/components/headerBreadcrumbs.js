import { isString } from "lodash";
import PropTypes from "prop-types";
// react router dom
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Link, Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//
import { MBreadcrumbs } from "./@material-extend";
import { uniqueId } from "lodash";

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.object,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}) {
  return (
    <Box sx={{ my: { sm: 1, xs: 0 }, width: 1, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: { sm: "flex", xs: "none" } }}>
          {links && <MBreadcrumbs links={links} {...other} />}
        </Box>

        {action ? (
          action.href ? (
            <>
              <Box
                sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={action.href}
                  startIcon={action.icon ? action.icon : <AddIcon />}
                  sx={{ display: { sm: "flex", xs: "none" } }}
                >
                  {action.title}
                </Button>
              </Box>

              <Fab
                color="primary"
                aria-label="add"
                sx={{
                  position: "fixed",
                  bottom: 10,
                  right: 10,
                  zIndex: 1000,
                  display: {
                    sm: "none",
                    xs: "flex",
                  },
                }}
                component={RouterLink}
                to={action.href}
              >
                {action.icon ? action.icon : <AddIcon />}
              </Fab>
            </>
          ) : (
            action
          )
        ) : null}
      </Box>

      <Box sx={{ ml: "auto" }}>
        {isString(moreLink) ? (
          <Link
            component={RouterLink}
            href={moreLink}
            target="_blank"
            variant="body2"
          >
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={uniqueId}
              href={href}
              variant="body2"
              target="_blank"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
