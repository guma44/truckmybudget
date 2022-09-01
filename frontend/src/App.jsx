import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import HomeContainer from './pages/Home';

import * as Paths from './paths';

import { loadApp } from './entities/app';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
      light: '#c36591',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


const App = () => {
  const {
    NODE_ENV,
    REACT_APP_APPSTORE_ID,
    REACT_APP_NAME,
    REACT_APP_MATOMO_ID,
  } = process.env;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadApp());
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <>
          <Header />
          <Switch>
            <Route exact path={Paths.HOME} component={HomeContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      </ThemeProvider>
  );
};

export default withRouter(App);
