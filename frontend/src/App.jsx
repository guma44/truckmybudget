import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import RequireUser from './components/RequireUser';
import NotFound from './pages/NotFound';
import HomeContainer from './pages/Home';
import UtilsContainer from './pages/Utils';
import StatsContainer from './pages/Stats';
import LoginContainer from './pages/Login';

import * as Paths from './paths';

// import { loadApp } from './entities/app';

const theme = createTheme({
});


const App = () => {
  const {
    NODE_ENV,
    REACT_APP_APPSTORE_ID,
    REACT_APP_NAME,
    REACT_APP_MATOMO_ID,
  } = process.env;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadApp());
  // }, []);

  return (
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          confirmationButtonProps={{variant: "outlined"}}
          cancelationButtonProps={{variant: "outlined"}}
        >
          <ToastContainer
            autoClose={1000}
            hideProgressBar={true}
            theme="colored"
            closeButton={false}/>
          <Header />
          <Routes>
            <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
              <Route exact path={Paths.HOME} element={<HomeContainer/>} />
            </Route>
            <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
              <Route exact path={Paths.UTILS} element={<UtilsContainer/>} />
            </Route>
            <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
              <Route exact path={Paths.STATS} element={<StatsContainer/>} />
            </Route>
            <Route exact path={Paths.LOGIN} element={<LoginContainer/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </ConfirmProvider>
      </ThemeProvider>
  );
};

export default App;
