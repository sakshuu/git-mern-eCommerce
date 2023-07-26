import { Box, ListItem, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector} from "react-redux";
import { adminUserAction, updateUserStatusAction } from '../../redux/admin/actions/userAction';
import { getAdminUsers } from '../../redux/admin/reducers/userReducer';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import useSerielize from '../../hooks/useSerielize';

const UserList = () => {

    const dispatch = useDispatch()
    const {users, toggle} = useSelector(getAdminUsers)
    const [x, setX] = useState({
      name:"aaa", age:"90"
    })
    const dd = useSerielize(x)
    useEffect(() => {
    dispatch(adminUserAction())
    }, [toggle])

    const [inp, setInp] = useState("")
    const fetchUsers = async e => {
      try {
        const {data} = await axios.get("http://localhost:5000/api/employee/search", {
          params:{
            term: inp
          }
        })
   console.log(data);
      } catch (error) {
        console.log(error);
      }
    } 

    const dedebounceValue = useDebounce(inp,2000) //2 second
    useEffect(() => {
   fetchUsers()
    }, [dedebounceValue])
    

  return <>
  {dd}
  <input type="text" onChange={e => setInp(e.target.value)} placeholder='search the user' style={{ margin:'10px', height:'30px'}}/>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">User Contact</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right"> 
              <Switch checked={row.active} 
      onChange={e => dispatch(updateUserStatusAction({...row, active:e.target.checked}))}
      // inputProps={{ 'aria-label': 'controlled' }}
              // onChange={e => console.log(e.target.checked)}
              />
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </>
}

export default UserList