import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/users/reducer/authReducer';
import { userLogoutAction } from '../redux/users/action/authAction';
import { getcartData } from '../redux/users/reducer/cartReducer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function Navbar() {
  // aapala code start
  const{userLogin} = useSelector(getUserAuthData)
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
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>

        <p>Messages</p>
      </MenuItem>
      <MenuItem>
      <Link to="/login" className='nav-link'>Login</Link>
      </MenuItem>
      <MenuItem>
      <Link to="/register" className='nav-link'>Register</Link>
      </MenuItem>
      
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const dispatch = useDispatch()
  const navigate = useNavigate()
 const {cart} = useSelector(getcartData)
  const authenticatedlinks = [
    {
      label:`Cart ${cart.length}`,
      to:"/user/cart",
      type:"link",
    },
    {
      label:"Account",
      to:"/user/account",
      type:"link",
    },
    {
      label:"logout",
      type:"button",
      cb:e => {
        dispatch(userLogoutAction())
        navigate("/login/?r=userlogout")
      },
    },
  ]

  

  return (<Box sx={{ flexGrow: 1, marginBottom:'4rem'}}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to="/" className='nav-link'>FLIPKART PRO</Link>
            
          </Typography>

          {/* <Typography
                          variant="h6"
                          noWrap>
                            <Link to="/cart" className='nav-link'>Cart</Link>
                          
                        </Typography> */}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
         
          {
            userLogin ?  <>
            {
              authenticatedlinks.map(item  => <>
              {
                item.type === "link" && <Typography variant='h6' noWrap marginX={1}><Link className='nav-link' to={item.to}>{item.label}</Link></Typography>
              }
              {
                item.type === "button" && <Typography variant='h6' noWrap>
                <Button variant='inherit' 
                onClick={item.cb}
                >{item.label}</Button>
                </Typography>
              }
              </>)
            }


            </>
                      : <Box sx={{ display: { xs: 'none', md: 'flex' }, 
                      alignItems:"center"
                      }}>
              
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{marginRight: "1.5rem"}}
                          >
                            <Link to="/login" className='nav-link'>Login</Link>
                          
                        </Typography>
                       <Divider variant='vertical' />
                        <Typography
                          variant="h6"
                          noWrap>
                            <Link to="/register" className='nav-link'>Register</Link>
                          
                        </Typography>

              
                          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                              <MailIcon />
                            </Badge>
                          </IconButton>
                          <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                          >
                            <Badge badgeContent={17} color="error">
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                          <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                        </Box>
          }
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
                
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

