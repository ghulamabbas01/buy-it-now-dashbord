// ----------------------------------------------------------------------

export default function Skeleton(theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
          "&.MuiSkeleton-rectangular": {
            borderRadius: "8px",
          },
        },
      },
    },
  };
}
