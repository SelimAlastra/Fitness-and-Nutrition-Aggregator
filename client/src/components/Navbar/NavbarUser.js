import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Searchbox from './Searchbox';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { signOut } from '../../actions/userAuth.js';
import { Link, useHistory } from 'react-router-dom';
import LayersIcon from '@material-ui/icons/Layers';
import "./Navbar.css"

/**
 * style the Navbar
 */
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width: '50px'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    '&:hover': {
      color: "#9bda8e",
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

/**
 * @return Navbar element
 */
export default function NavbarUser({ updatedPosts, setUpdatedPosts }) {

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton component={Link} to={`/user/profile/${JSON.parse(localStorage.getItem('user'))._id}`}>
          <div>
            <AccountBoxIcon />
            <text style={{ fontSize: "1.2rem" }}> Profile</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} onClick={() => window.location.href = `/user/contactUs/${JSON.parse(localStorage.getItem('user'))._id}`} >
          <div>
            <LiveHelpIcon />
            <text style={{ fontSize: "1.2rem" }}> Contact </text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton component={Link} onClick={() => { signOut(() => { history.push('/'); }); }}>
          <div>
            <ExitToAppIcon />
            <text style={{ fontSize: "1.2rem" }}> Log out </text>
          </div>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton component={Link} onClick={() => window.location.href = `/homePage/${JSON.parse(localStorage.getItem('user'))._id}`} >
          <div>
            <HomeIcon />
            <text style={{ fontSize: "1.2rem" }}> Home </text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} to={`/user/myservices/${JSON.parse(localStorage.getItem('user'))._id}`} >
          <div>
            <CollectionsBookmarkIcon />
            <text style={{ fontSize: "1.2rem" }}> Bundles</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} to={`/user/myBuckets/${JSON.parse(localStorage.getItem('user'))._id}`}>
          <div>
            <LayersIcon className={classes.iconButton} />
            <text style={{ fontSize: "1.2rem" }}> Buckets</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} to={`/user/profile/${JSON.parse(localStorage.getItem('user'))._id}`} >
          <div>
            <AccountBoxIcon />
            <text style={{ fontSize: "1.2rem" }}> Profile </text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} data-testid="contactButton" onClick={() => window.location.href = `/user/contactUs/${JSON.parse(localStorage.getItem('user'))._id}`} >
          <div>
            <LiveHelpIcon />
            <text style={{ fontSize: "1.2rem" }}> Contact </text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton component={Link} onClick={() => { signOut(() => { history.push('/'); }); }}>
          <div>
            <ExitToAppIcon />
            <text style={{ fontSize: "1.2rem" }}> Log out </text>
          </div>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow, "navbar-top"}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography onClick={() => window.location.href = `/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`} className={classes.title, "logo", "landing"} style={{ "cursor": "pointer" }} variant="h6" noWrap>
            LOGO
          </Typography>
          {document.URL.includes("clientDashboard/") ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Searchbox updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts} />
            </div>
          ) : (
            <IconButton
              onClick={() => window.location.href = `/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`}
              style={{ width: '50px', left: "0.5rem" }}
              color="inherit">
              <SearchIcon className={classes.iconButton} />
            </IconButton>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              onClick={() => window.location.href = `/homePage/${JSON.parse(localStorage.getItem('user'))._id}`}
              style={{ width: '50px' }}
              data-testid="homeButton"
              color="inherit">
              <HomeIcon className={classes.iconButton} />
            </IconButton>
            <IconButton onClick={() => window.location.href = `/user/myservices/${JSON.parse(localStorage.getItem('user'))._id}`} style={{ width: '50px' }} data-testid="myServicesButton" color="inherit">
              <CollectionsBookmarkIcon className={classes.iconButton} />
            </IconButton>
            <IconButton onClick={() => window.location.href = `/user/myBuckets/${JSON.parse(localStorage.getItem('user'))._id}`}
              style={{ width: '50px' }}
              data-testid="bucketsButton"
              color="inherit">
              <div>
                <LayersIcon className={classes.iconButton} />
              </div>
            </IconButton>
            <IconButton style={{ width: '50px' }}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              data-testid="ToggleButton"
              color="inherit"
            >
              <AccountCircle className={classes.iconButton} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton style={{ width: '50px' }}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ width: '50px' }} className={classes.iconButton} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

