import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// hooks
// import useSettings from "src/hooks/useSettings";
// material
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Paper,
  Button,
  Typography,
  CardContent,
  Skeleton,
  IconButton,
  Fab,
  useMediaQuery,
} from "@mui/material";
//
import { varFadeInRight, MotionContainer } from "src/components/animate";
// import { useRouter } from "next/router";
import { motion, AnimatePresence, useCycle } from "framer-motion";
// import { wrap } from "popmotion";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import NoData from "src/pages/noData";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.number,
};
function CarouselItem({ item, index, handleClickOpen }) {
  const { t } = useTranslation("setting");
  const navigate = useNavigate();
  const theme = useTheme();
  //   const router = useRouter();
  const isMobile = useMediaQuery("@media (max-width: 992px)");
  const [first, setfirst] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setfirst(true);
    }, 100);
  }, [index]);

  return (
    <Paper
      sx={{
        position: "relative",
        pb: { xs: "44%", md: "40%" },
        zIndex: 11,
        bgcolor: "transparent",
        borderRadius: "8px",
        img: {
          borderRadius: "8px",
          objectFit: "contain",
          width: "100%",
          objectPosition: {
            sm: "center",
            xs: theme.direction === "rtl" ? "right" : "left",
          },
          ...(theme.direction === "rtl" && {
            "-webkit-transform": "scaleX(-1)",
            transform: "scaleX(-1)",
          }),
          "&:after": {
            content: `""`,
            display: "block",
            pb: "100%",
          },
        },
      }}
    >
      <Box
        sx={{
          bottom: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        {item && <img src={item?.cover.url} alt="hero-carousel" />}
      </Box>

      <Box
        sx={{
          bottom: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: `linear-gradient(to top, ${alpha(
            theme.palette.grey[800],
            0.4
          )} 0%`,
        }}
      />
      <CardContent
        sx={{
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          width: "100%",
          maxWidth: { md: 630, sm: 400, xs: 300 },
          textAlign: "left",
          position: "absolute",
          color: "common.white",
        }}
      >
        <MotionContainer open={first}>
          <motion.div variants={varFadeInRight}>
            <Typography
              variant="h1"
              // component={index === 0 ? "h1" : "div"}
              component="h1"
              color={theme.palette.grey[800]}
              sx={{ fontWeight: 700, pointerEvents: "none" }}
              lineHeight={1.1}
              gutterBottom
            >
              {item?.heading}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Typography
              variant="h6"
              noWrap
              color={theme.palette.grey[800]}
              gutterBottom
              sx={{
                fontWeight: 400,
                pointerEvents: "none",
                mt: 1,
              }}
            >
              {item?.description}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <div>
              <Button
                size={isMobile ? "small" : "large"}
                variant="contained"
                startIcon={<DeleteOutlineRoundedIcon />}
                sx={{ mt: 1 }}
                onClick={handleClickOpen(item?._id)}
              >
                {t("delete")}
              </Button>

              <Button
                size={isMobile ? "small" : "large"}
                variant="outlined"
                startIcon={<EditRoundedIcon />}
                color="secondary"
                sx={{ mt: 1, mx: 2 }}
                onClick={() =>
                  navigate(`/settings/application/slides/${item?._id}`)
                }
              >
                {t("edit")}
              </Button>
              {/* <Fab
              size={isMobile ? "small" : "large"}
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={() =>
               navigate(`/settings/application/slides/${item?._id}`)
             }
           >
             <EditRoundedIcon />
             </Fab> */}
            </div>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

export default function CarouselAnimation({
  data,
  isLoading,
  handleClickOpen,
}) {
  const theme = useTheme();
  //   const { themeMode } = useSettings();
  const [[page, direction], setPage] = useState([0, 0]);
  // const [items, setItems] = useCycle([0, 0], [1, 1], [2, 2]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  //   const imageIndex = wrap(0, data?.length, page);
  const imageIndex = Math.abs(page % data?.length);
  console.log(data);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  useEffect(() => {
    setTimeout(() => {
      setPage([page + 1, 1]);
    }, 12000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={460} />
      ) : data.length == 0 ? (
        <NoData />
      ) : (
        <Paper
          sx={{
            width: "100%",
            position: " relative",
            display: " flex",
            justifyContent: " center",
            alignItems: " center",
            overflow: "hidden",
            pt: { xs: "70%", md: "40%" },
            borderRadius: "8px",
            "& .motion-dev": {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
            },
            [theme.breakpoints.down("md")]: {
              border: "none",
              h1: {
                fontSize: 20,
                mb: 0.5,
              },
              h2: {
                fontSize: 16,
                mb: 0.5,
              },
              // "& .MuiPaper-root": {
              //   pt: "65%",
              // },
              "& .slick-dots": {
                bottom: "10px",
              },
            },
          }}
        >
          {!isLoading && (
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                className="motion-dev"
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <CarouselItem
                  //   themeMode={themeMode}
                  item={data[imageIndex]}
                  index={data[imageIndex]}
                  activeStep={imageIndex}
                  isActive={imageIndex}
                  key={Math.random()}
                  handleClickOpen={handleClickOpen}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </Paper>
      )}
    </>
  );
}
