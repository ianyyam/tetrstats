import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppContext from './AppContext';
import Tooltip from '@mui/material/Tooltip';

const CURRENTUSER = 'fortuity';

/**
 * @returns {*} JSX Component
 */
function Usercard() {
  const {darkMode} = React.useContext(AppContext);
  const [userData, setUserData] = React.useState(null);
  const [leagueData, setLeagueData] = React.useState(null);

  React.useEffect(() => {
    /**
     * returns data for given user
     */
    async function fetchData() {
      // general user data
      const response =
        await fetch(`/api/users/${CURRENTUSER}`);
      const data = await response.json();
      setUserData(data);
      // tetra league data
      // !!! will need to accomodate players who dont have league data
      const response2 =
        await fetch(`/api/users/${CURRENTUSER}/summaries/league`);
      const data2 = await response2.json();
      setLeagueData(data2);
    }
    fetchData();
  }, []);
  const fontColor = darkMode ? '#fff': '#2c2c34';
  const pfpImageLink = userData ?
    `https://tetr.io/user-content/avatars/${userData.data._id}.jpg?rv=${userData.data.avatar_revision}` :
    '';
  const winLoss = leagueData ?
    ((leagueData.data.gameswon /
        leagueData.data.gamesplayed) * 100).toFixed(1) :
    '';
  const rankImage = leagueData?
    `https://tetr.io/res/league-ranks/${leagueData.data.rank}.png`:
    '';
  const badges = userData ? userData.data.badges :
    [];

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
        justifyContent='center'
        sx={{
          p: 2.5,
          // i originally had this to prevent overlap with rank logo,
          // but idk if i need it now
          // pr: 7.5,
          backgroundColor:
            darkMode ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderRadius: 3,
          boxShadow: 3,
          width: '100%',
          // maxWidth: '400px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box>
          {leagueData && (
            <Box
              component="img"
              src={rankImage}
              alt="User Rank"
              sx={{
                position: 'absolute',
                top: 18,
                right: 18,
                width: 40,
                height: 40,
              }}
            />
          )}
          {userData ? (
            <Box display="flex" flexDirection="row" alignItems="flex-start">
              <Box
                component="img"
                src={pfpImageLink}
                alt={''}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '10%',
                }}
              />
              <Box display="flex" flexDirection="column" ml={2} mr={4.5}>
                <Typography
                  variant='h5'
                  sx={{fontFamily: 'inherit',
                    color: fontColor,
                    wordBreak: 'break-word',
                    // mt: -0.8,
                  }}>
                  {userData.data.username.toLowerCase()}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{fontFamily: 'inherit',
                    color: fontColor,
                    wordBreak: 'break-word',
                    mt: 0.2,
                  }}>
                  {winLoss}% winrate
                </Typography>
                {leagueData &&
                  <Typography
                    variant='caption'
                    sx={{fontFamily: 'inherit',
                      color: fontColor,
                      wordBreak: 'break-word',
                      mt: -0.3,
                    }}>
                    top {(leagueData.data.percentile * 100).toFixed(1)}%
                  </Typography>
                }
              </Box>
            </Box>
          ) : (
            <span style={{color: '#fff'}}>Loading...</span>
          )}
        </Box>
        {badges.length !== 0 &&
          <Box
            sx={{
              mt: 2,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{display: 'flex',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap'}}>
              {badges.map((badge) => {
                return (
                  <Tooltip key={badge.id} title={badge.label}>
                    <Box
                      key={badge.id}
                      component="img"
                      src={`https://tetr.io/res/badges/${badge.id}.png`}
                      alt={badge.label}
                      sx={{
                        'height': 20,
                        'transition': 'transform 0.3s ease',
                        '&:hover': {transform: 'scale(1.2)'},
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        }
      </Box>
    </Box>
  );
}

export default Usercard;
