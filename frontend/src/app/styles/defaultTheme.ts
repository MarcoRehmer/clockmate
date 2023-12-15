import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      '900': '#00513b',
      '800': '#006e58',
      '700': '#007e67',
      '600': '#008e77',
      '500': '#009b85',
      '400': '#00ac98',
      '300': '#00bcab',
      main: '#4fd1c5',
      '100': '#9ee3db',
      '50': '#d9f4f2',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#BDBDBD',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(0, 0, 0, 0.06) 0px 3.5px 5.5px 0px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: 'rgba(0, 0, 0, 0.08) 0px 3.5px 5.5px 0px',
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 16,
          paddingBottom: 16,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
        },
      },
    },
  },
});
