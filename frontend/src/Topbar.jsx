import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppContext from './AppContext';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import React from 'react';

// import {useNavigate, useParams} from 'react-router-dom';

/**
 * @returns {object} JSX component
 */
function Topbar() {
  const {darkMode, setIsDarkMode} = React.useContext(AppContext);
  const bgColor =
    darkMode ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  return (
    <>
      <AppBar position='fixed'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: bgColor,
          backdropFilter: 'blur(5px)',
        }}>
        <Toolbar variant='dense'>
          <img
            src="/tetrstatsicon.png"
            alt="Logo"
            style={{height: 17, marginRight: 8}}
          />
          <span style={{color: darkMode ? '#fff' : '#2c2c34'}}>tetrstats</span>
          <Box sx={{flexGrow: 1}} />
          {darkMode &&
            <IconButton
              sx={{
                color: 'white',
                mr: -1.5,
              }}
              onClick={() => setIsDarkMode(false)}>
              <NightlightIcon
                sx={{
                  height: '22px',
                }}/>
            </IconButton>
          }
          {!darkMode &&
            <IconButton
              sx={{
                color: 'white',
                mr: -1.5,
              }}
              onClick={() => setIsDarkMode(true)}>
              <WbSunnyIcon
                sx={{
                  color: '#2c2c34',
                  height: '22px',
                }}/>
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Topbar;
