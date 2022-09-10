import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import RequireUser from './components/RequireUser';
import NotFound from './pages/NotFound';
import HomeContainer from './pages/Home';
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
        <>
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
            <Route exact path="/login" element={<LoginContainer/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </>
      </ThemeProvider>
  );
};

export default App;
