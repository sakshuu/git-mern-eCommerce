// import axios from 'axios'
// import React, { useEffect } from 'react'

// const Dashboard = () => {

//   const getAdminPofile = async () => {
//     try {
//       const {data} = await axios.get("http://localhost:5000/employee/profile", {withCredentials: true})
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getAdminPofile()
//   }, [])
//   return <>
  
//   </>
// }

// export default Dashboard

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { employeeStatAction } from '../../redux/admin/actions/employeeAction'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { getemployeeData } from '../../redux/admin/reducers/employeeReducer';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { stats } = useSelector(getemployeeData)
  useEffect(() => {
    dispatch(employeeStatAction())
  }, [])
  
  const data = {
    labels: ['Online', 'COD', 'Cancel orders'],
    datasets: [
      {
        label: '# payment',
        data: [stats?.paidOrders, stats?.codOrders, stats?.cancelOrders ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <> 
  <div style={{width:"400px"}}>
  <Doughnut data={data}/>
  </div>
  
  </>
}

export default AdminDashboard