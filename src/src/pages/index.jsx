import React from 'react';
import App from '../components/App/App';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '../styles/useDarkmode';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import Sun from '../images/sunFriend.svg';
import Moon from '../images/moonFriend.svg';
import { Helmet } from 'react-helmet';

export default function Index() {

  const [theme,toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const Toggler = () => (

    <div className='toggler'>
      <input
        type="checkbox"
        name="theme"
        id="theme"
        onChange={toggleTheme}
        checked={theme === "dark" ? true : false}
        aria-label="theme toggler"
      />

      <label htmlFor="theme">
        <Moon/>
        <Sun />
        <span 
          className="ball"
          aria-label="theme toggler"
          title="Toggle theme"
        />

      </label>

    </div>

  )


  const title = "Tom Lam"
  const description = "I like to put my unique spin on solving every difficult problem"

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description}/>
        <meta name='og:type' content="website"/>


        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <script
          src='https://kit.fontawesome.com/740a5138ca.js'
          crossorigin='anonymous'
        ></script>

      </Helmet>

      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <App theme={theme}>
          <Toggler />
        </App>

      </ThemeProvider>
    </>
  );

}