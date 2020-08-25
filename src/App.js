import React from 'react';
import SearchForm from './components/searchForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

function App() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        paper: '#424242',
      },
    }
  });

  return (
    <div style={{
      backgroundColor: "#303030", 
      height: "100vh", 
      width: "100vw", 
      overflowX: "hidden"}}>
    <ThemeProvider theme={darkTheme}>
      <SearchForm/>
    </ThemeProvider>
    </div>
  );
}

export default App;
