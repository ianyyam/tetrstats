import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppContext from './AppContext';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

/**
 * @returns {*} JSX Component
 */
function Rankdistcard() {
  const {darkMode} = React.useContext(AppContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    /**
     * returns tetra channel rank dist data
     */
    async function fetchRankData() {
      const response =
        await fetch('/api/labs/league_ranks');
      const result = await response.json();
      setData(result.data.data);
    }
    fetchRankData();
  }, []);

  if (!data) {
    return <Box sx={{m: 2}}>Loading...</Box>;
  }

  // filter out 'total' category from api response
  const categories =
    Object.keys(data).filter((key) => key !== 'total');

  return (
    <Box
      display='flex'
      alignItems='center'
      // sx={{
      //   mt: 0.5,
      //   ml: 1.5,
      //   mr: 1.5,
      // }}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        sx={{
          'pl': 2.5,
          'pr': 2.5,
          'pt': 2,
          'backgroundColor':
            darkMode ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          'backdropFilter': 'blur(5px)',
          'borderRadius': 3,
          'boxShadow': 3,
          'width': '100%',
          // maxWidth: '400px',
          'position': 'relative',
          'height': {xs: 'calc(100vh - 100px)',
            sm: 'calc(100vh - 48px - 24px)'},
          'overflowY': 'auto',
          // For WebKit browsers (Chrome, Safari, Opera)
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-button': {
            display: 'none',
          },
          // For Firefox
          'scrollbarWidth': 'thin',
          'scrollbarColor': '#888 transparent',
          // (IE/old Edge are Chromium now, so this may not be needed)
        }}
      >
        {categories.map((cat) => {
          const info = data[cat];
          return (
            <Box
              key={cat}
              sx={{mb: 2, pb: 0.5}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Tooltip key={cat}
                  title={`Target: ${info.targettr.toFixed(0)}`}>
                  <Box
                    component="img"
                    src={`https://tetr.io/res/league-ranks/${cat}.png`}
                    alt="User Rank"
                    sx={{'width': 40, 'height': 40, 'mr': 1,
                      'transition': 'transform 0.3s ease',
                      '&:hover': {transform: 'scale(1.1)'},
                    }}
                  />
                </Tooltip>
                <Typography variant="h5" component="div"
                  sx={{fontWeight: 'bold'}}>
                  {info.tr.toFixed(0)} TR
                  {/* (Target: {info.targettr.toFixed(0)}) */}
                </Typography>
              </Box>
              <Typography variant="body2">
                # Players: {info.count}{' '}
                | APM: {info.apm.toFixed(1)} | PPS:{' '}
                {info.pps.toFixed(2)} | VS: {info.vs.toFixed(1)}
              </Typography>
              <Divider
                sx={{mt: 1,
                  mb: -1,
                  borderColor: darkMode? '#2c2c34' : 'grey'}}/>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
export default Rankdistcard;
