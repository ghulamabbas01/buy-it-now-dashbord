import PropTypes from "prop-types";

import { useDropzone } from "react-dropzone";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Stack,
  Paper,
  Button,
  ListItem,
  Typography,
  Skeleton,
} from "@mui/material";
// utils
import { fData } from "../../utils/formatNumber";
//
import { MIconButton } from "../@material-extend";
import { varFadeInRight } from "../animate";
import { UploadIllustration } from "../../assets";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  sx: PropTypes.object,
};

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  blob,
  isInitialized,
  isEdit,
  onRemoveAll,
  loading,
  sx,
  ...other
}) {
  const hasFile = files.length > 0;
  const { t } = useTranslation("common");
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} disabled={loading} />
        <UploadIllustration sx={{ width: 220 }} />
        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            {t("drop-or-select-images")}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("drop-images-here-or-click-through-your-machine")}
          </Typography>
        </Box>
      </DropZoneStyle>
      {fileRejections.length > 0 && <ShowRejectionItems />}
      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        {(loading
          ? [...Array(isEdit ? files.length + blob.length : blob.length)]
          : files
        ).map((file) =>
          loading ? (
            <ListItem
              key={Math.random()}
              {...varFadeInRight}
              sx={{
                my: 1,
                p: 0,
                width: 80,
                height: 80,
                borderRadius: 1,
                display: "inline-flex",
                mx: 0.5,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Skeleton variant="rectagular" width={"100%"} height={"100%"} />
            </ListItem>
          ) : (
            <ListItem
              key={Math.random()}
              {...varFadeInRight}
              sx={{
                p: 0,
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.5,
                overflow: "hidden",
                position: "relative",
                display: "inline-flex",
              }}
            >
              <Paper
                variant="outlined"
                component="img"
                src={!file.blob ? file.url : file.blob}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
              />

              <Box sx={{ top: 6, right: 6, position: "absolute" }}>
                <MIconButton
                  size="small"
                  onClick={() => onRemove(file)}
                  sx={{
                    p: "2px",
                    color: "common.white",
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                    },
                  }}
                >
                  <CloseRoundedIcon />
                </MIconButton>
              </Box>
            </ListItem>
          )
        )}
      </List>

      <Stack direction="row" justifyContent="flex-end">
        {loading ? (
          <Skeleton
            variant="rectagular"
            width={106}
            height={36}
            sx={{ mr: 1.5 }}
          />
        ) : (
          hasFile && (
            <Button variant="contained" onClick={onRemoveAll} sx={{ mr: 1.5 }}>
              {t("remove-all")}
            </Button>
          )
        )}
      </Stack>
    </Box>
  );
}
