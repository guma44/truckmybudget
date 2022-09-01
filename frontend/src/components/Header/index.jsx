import {
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  Typography,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { applicationUserSelector } from '../../entities/app/selectors';
import { useSelector } from 'react-redux';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from "../Drawer"


const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Header = ({ appName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(applicationUserSelector);

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  return <>
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
        <PointOfSaleIcon/> TMB
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </>;
};

Header.defaultProps = {
  appName: 'APP NAME',
};

export default Header;
