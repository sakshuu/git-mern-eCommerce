import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getUserAuthData } from '../redux/users/reducer/authReducer';
import { useSelector } from 'react-redux';

export default function AddressForm() {
  const {userLogin} = useSelector(getUserAuthData)

  const userData = [
{
 label:"Enter name",
  val: userLogin ? userLogin.name : "" ,
  disabled:true
},
{
 label:"Enter house Number",
  val: userLogin ? userLogin.house : "" ,
  disabled:true
},
{
 label:"Enter landmark",
  val: userLogin ? userLogin.landmark : "" ,
  // disabled:true
},
{
 label:"Enter city",
  val: userLogin ? userLogin.city : "" ,
  // disabled:true
},
{
 label:"Enter state",
  val: userLogin ? userLogin.state : "" ,
  // disabled:true
},
{
   label:"Enter pincode",
    val: userLogin ? userLogin.pincode : "" ,
    // disabled:true
},
]
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>

{
  userData.map(item => <Grid item xs={12} sm={6}>
    <TextField
      required
      id={item.val}
      disabled={item?.disabled}
      name={item.val}
      label={item.label}
      fullWidth 
      value={item.val}
      autoComplete={item.val}
      variant="standard"
    />
  </Grid>)
}
      </Grid>
    </React.Fragment>
  );
}