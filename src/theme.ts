import { createTheme } from '@mui/material/styles';

const primaryColor: string = '#fff';
const secondaryColor: string = '#212121';
const darkColor: string = '#161616';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor,
      dark: darkColor
    },
    error: {
      main: '#ff0000',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
          color: primaryColor,
          fontFamily: 'sans-serif'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: primaryColor
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: '14px',
        },
        colorPrimary: {
          color: 'black',
          backgroundColor: primaryColor,
        },
        colorSecondary: {
          color: primaryColor,
          backgroundColor: '#373737',
          border: '1px solid #4b4b4b',
        }
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(102,102,102,1)'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'sans-serif'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '&::-webkit-scrollbar': {
          width: "8px",
          backgroundColor: darkColor
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '5px',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.25)'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: '#bbbbbb'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          borderRadius: '5px',
          backgroundColor: '#868686'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#282828'
        }
      }
    }
  }
});

export default theme;
