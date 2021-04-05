import React, {useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Searchbox from './Searchbox';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from '../../actions/userAuth.js';
import { Link, useHistory } from 'react-router-dom';
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
      color: "#8CC152",
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
export default function NavbarProfessional({updatedPosts, setUpdatedPosts}) {

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

  /**
   * render the usual dropdown menu
   */
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
        <IconButton component={Link} to={`/professional/profile/${JSON.parse(localStorage.getItem('user'))._id}`}> 
          <div>
            <AccountBoxIcon/> 
            <text style={{fontSize:"1.2rem"}}>Profile</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton component={Link} to={`/professional/services/edit/${JSON.parse(localStorage.getItem('user'))._id}`} > 
          <div>
            <CollectionsBookmarkIcon/> 
            <text style={{fontSize:"1.2rem"}}>Bundles</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton component={Link} to={`/professional/edit/${JSON.parse(localStorage.getItem('user'))._id}`}> 
          <div>
            <SettingsIcon/> 
            <text style={{fontSize:"1.2rem"}}>Settings</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton onClick={() => { signOut(() => { history.push('/'); });}}> 
          <div>
            <ExitToAppIcon/> 
            <text style={{fontSize:"1.2rem"}}>Log out</text>
          </div>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  /**
   * render the more  dropdown menu
   */
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
        <IconButton onClick={() => window.location.href = `/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`} > 
          <div>
            <HomeIcon/> 
            <text style={{fontSize:"1.2rem"}}>Home</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} to={`/professional/services/edit/${JSON.parse(localStorage.getItem('user'))._id}`}> 
          <div>
            <CollectionsBookmarkIcon/> 
            <text style={{fontSize:"1.2rem"}}>Bundles</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton component={Link} to={`/professional/profile/${JSON.parse(localStorage.getItem('user'))._id}`} > 
          <div>
            <AccountBoxIcon/> 
            <text style={{fontSize:"1.2rem"}}>Profile</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem>
      <IconButton component={Link} to={`/professional/edit/${JSON.parse(localStorage.getItem('user'))._id}`}> 
          <div>
            <SettingsIcon/> 
            <text style={{fontSize:"1.2rem"}}>Settings</text>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton onClick={() => { signOut(() => { history.push('/'); });}}> 
          <div>
            <ExitToAppIcon/> 
            <text style={{fontSize:"1.2rem"}}>Log out</text>
          </div>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow, "navbar-top"}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={() => window.location.href = `/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`} className={classes.title, "logo", "landing"} style = {{"cursor" : "pointer"}} variant="h6" noWrap>
            LOGO
          </Typography>

          { document.URL.includes("/professionalDashboard") ? (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Searchbox updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
          </div>
          ) : (
            <IconButton
            onClick={() => window.location.href = `/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`}
            style={{width: '50px', left: "0.5rem"}} 
            color="inherit">
              <SearchIcon />
            </IconButton>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton 
              onClick={() => window.location.href = `/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`}
              style={{width: '50px'}}
              data-testid="proHomeButton" 
              color="inherit">
              <HomeIcon className={classes.iconButton} />
            </IconButton>
            <IconButton component={Link} to={`/professional/services/add/${JSON.parse(localStorage.getItem('user'))._id}`} style={{width: '50px'}} data-testid="addBundlesButton" color="inherit">
                <AddCircleIcon className={classes.iconButton}/>
            </IconButton>
            {/* <IconButton style={{width: '50px'}} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon className={classes.iconButton}/>
              </Badge>
            </IconButton> */}
            <IconButton style={{width: '50px'}}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              data-testid="proToggleButton" 
              color="inherit"
            >
              <AccountCircle className={classes.iconButton}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton style={{width: '50px'}}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className={classes.iconButton} style={{width: '50px'}} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

