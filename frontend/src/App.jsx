import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Topbar from './Topbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppContext from './AppContext';
import Usercard from './Usercard';
import Rankdistcard from './Rankdistcard';
// import HunDIN1451 from '/fonts/HunDIN1451.ttf';

const fontFamily =
  'HUN-din 1451, -apple-system, BlinkMacSystemFont, "Segoe UI", ' +
  'Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", ' +
  'sans-serif';

const lightTheme = {
  fontFamily: fontFamily,
  colors: {
    text: '#000',
    background: '#fff',
  },
};

const darkTheme = {
  ontFamily: fontFamily,
  colors: {
    text: '#fff',
    background: '#000',
  },
};

const AppContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.$darkMode ?
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/gradient.jpeg') center/cover no-repeat` :
    `url('/gradient.jpeg') center/cover no-repeat`};
  min-height: 100vh;
  padding-top: 48px;
`;

/**
 * @returns {object} JSX
 */
function App() {
  const [darkMode, setIsDarkMode] = React.useState(true);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const appContext = {darkMode, setIsDarkMode};

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppContext.Provider value={appContext}>
        <AppContainer $darkMode={darkMode}>
          <Topbar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: {xs: 'column', sm: 'row'},
              mt: 1.5, gap: 1.5, mx: 1.5,
            }}
          >
            <Box
              sx={{'flex': 1,
                'maxWidth': {xs: 'auto', sm: '380px', xl: '600px'}}}>
              <Box>
                <Usercard />
              </Box>
            </Box>
            <Box sx={{'flex': 1}}>
              <Box>
                <Rankdistcard />
              </Box>
            </Box>
          </Box>
        </AppContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
