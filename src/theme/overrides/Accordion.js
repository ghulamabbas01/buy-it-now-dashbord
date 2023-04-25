// ----------------------------------------------------------------------

export default function Accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${theme.palette.divider}`,
          '&.Mui-expanded': {
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit'
            }
          }
        },
        expandIconWrapper: {
          color: 'inherit'
        }
      }
    }
  };
}
