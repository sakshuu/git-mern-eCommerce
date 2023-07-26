import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { UserLoginAction, UserLoginWithGoogle } from '../redux/users/action/authAction';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import { getUserAuthData } from '../redux/users/reducer/authReducer';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const theme = createTheme();

export default function SignIn() {

  const [error, setError] = useState()
  const [params, setParams] = useSearchParams()
  useEffect(() => {
    setError(params.get("redirected") === "401" ?
    "UnAuthorised Access" : null)
    setError(params.get("r") === "userlogout" ?
    "Logout Sucess" : null)
  }, [error])
  console.log(params.get("redirected"));

const {userLogin,userLoginError} =useSelector(getUserAuthData)
const navigate = useNavigate()

useEffect(() => {
  if (userLogin) {
    navigate("/user/account")
  }
}, [userLogin])

useEffect(() => {
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  gapi.load("client:auth2", ()=> {
    // gapi.client.init({
    gapi.auth2.init({
      clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      scope:""
    })
  } )
}, [])

const handleFail = (data) => {
console.warn(data);
}
const handleSuccess = (data) => {
// console.log(data);
dispatch(UserLoginWithGoogle({tokenId: data.tokenId}))
}

  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    dispatch(UserLoginAction({
      email:data.get('email'),
      password:data.get('password'),
    }))
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: 'url(https://images.pexels.com/photos/6214149/pexels-photo-6214149.jpeg?auto=compress&cs=tinysrgb&w=600)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}/>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {
            error && <Alert severity="error">{error}</Alert>
          }
          {
            userLoginError && <Alert severity="error">{userLoginError}</Alert>
          }
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // value="sakshisjadhav.120@gmail.com"
                // value="sakahisjadhav20@gmail.com"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // value="123"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} 
              >
                Sign In
              </Button>

              <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onFailure={handleFail}
              onSuccess={handleSuccess}
              cookiePolicy="single_host_origin"
              />

              <Grid container>
                <Grid item xs>
                  <Link to="/forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link src="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}