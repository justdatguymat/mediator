import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import { lime, lightBlue } from '@mui/material/colors';

const fontFamilies = {
  body: [
    'Montserrat',
    '\'Open Sans\'',
    '\'Nato Sans\'',
    'Lato',
    'Roboto',
    '\'Helvetica Neue\'',
    'Arial',
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
  ].join(','),
  headers: [
    'Pushster',
    //'Anton',
    //'\'Rammetto One\'',
    //'Syncopate',
    //'\'Poller One\'',
    //'Righteous',
    //'\'Gravitas One\'',
    //'\'Wendy One\'',
    //'\'Text me One\'',
    //'\'Helvetica Neue\'',
    //'Arial',
    //'sans-serif',
    //'-apple-system',
    //'BlinkMacSystemFont',
  ].join(','),
};

const theme = createTheme({
  //inputVariant: 'outlined',
  //buttonVariant: {
  //  primary: 'contained',
  //  secondary: 'text',
  //},
  //spacing: (factor) => `${0.5 * factor}rem`,
  shape: {
    borderRadius: 10,
  },
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.70)",
      secondary: "rgba(0, 0, 0, 0.60)",
      disabled: "rgba(0, 0, 0, 0.50)",
      hint: "rgba(0, 0, 0, 0.50)",
    },
    primary: {
      main: lime[500],
      contrastText: "white"
    },
    secondary: {
      main: lightBlue[500],
      contrastText: "white"
    },
    background: {
      default: lime[50],
      //paper: 'white',
    },
  },
  typography: {
    fontFamily: fontFamilies.body,
    button: {
      fontWeight: 600,
    },
    h1: {
      fontFamily: fontFamilies.headers,
    },
    h2: {
      fontFamily: fontFamilies.headers,
    },
    h3: {
      fontFamily: fontFamilies.headers,
    },
    h4: {
      fontFamily: fontFamilies.headers,
    },
    h5: {
      fontFamily: fontFamilies.headers,
    },
    h6: {
      fontFamily: fontFamilies.headers,
    },
  },
});


export default function Main({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pushster&display=swap');
      </style>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
