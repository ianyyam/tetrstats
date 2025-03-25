import {createContext} from 'react';

const AppContext = createContext({
  darkMode: null,
  setIsDarkMode: null,
});

export default AppContext;
