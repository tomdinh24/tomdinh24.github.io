import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '../styles/useDarkmode';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import NavBar from '../components/NavBar/NavBar';

export default function ErrorPage() {
  const [theme, ,] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <GlobalStyles />
        <NavBar />
        <h1>&#128148; 404: Page Not Found &#128148;</h1>
        <a href='/'>Return to safety.</a>
      </main>
    </ThemeProvider>
  );
}
