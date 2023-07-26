import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import { getUserProfileAction, updateUserProfileAction } from '../redux/users/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/users/reducer/authReducer';
import { getUserData } from '../redux/users/reducer/userReducer';


const Account = () => {

const {userLogin} = useSelector(getUserAuthData)
const {profile, toggle} = useSelector(getUserData)
const [selectedFiled, setselectedFiled] = useState()
const [userData, setUserData] = useState({})
const [fleids, setFleids] = useState([])


console.log(userLogin);
const disptach = useDispatch()

useEffect(() => {
 if (profile) {
  const keynames = []
 for (const [key, val] of Object.entries(profile)) {
  keynames.push(key)
 }
 setFleids(keynames)
 }
}, [profile])

useEffect(() => {
 disptach(getUserProfileAction())
 setselectedFiled(undefined)
}, [toggle])


  return <>
  <Grid container>
    {JSON.stringify(selectedFiled)}
  <Grid md={8} mdoffset={2}>
  <Card>
      <CardContent>
        {
            fleids.map(item  => <Stack direction="row" justifyContent="space-between">   
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                 {item}
               </Typography>
               <Typography color="green" gutterBottom>
        {
      profile &&  profile[item] 
         ? <>
{
  item === selectedFiled
  ? <TextField 
  value={userData[item]}
            onChange={e => setUserData({...userData,[item]: e.target.value})}
             placeholder={`please enter ${item}`}/>
  :   profile[item]
}

{
item !=="name" && item !== "email" && <Button onClick={e => setselectedFiled(item)}>Edit</Button>

}
</>
         : <TextField 
          onChange={e => setUserData({...userData,[item]: e.target.value})} placeholder={`please enter ${item}`}/>
        }
        </Typography>
       </Stack>
            )
        }
        {/* stack mhaje disply flex */}
{/*

 <Stack direction="row" justifyContent="space-between">   
   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Gmail
        </Typography>
        <Typography color="green" gutterBottom>
          {userLogin.email}
        </Typography>
</Stack>

<Stack direction="row" justifyContent="space-between">   
   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Mobile
        </Typography>
        <Typography color="green" gutterBottom>
        {
  userLogin.mobile ? userLogin.mobile : <TextField  placeholder='please enter moblie number'/>
        }
        </Typography>
</Stack> */}


      </CardContent>
      <CardActions>
<Button size="small" onClick={e => {disptach(updateUserProfileAction({...userData})) }}>Update profile</Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>
  </>
}

export default Account