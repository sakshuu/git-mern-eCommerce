// import React from 'react'
// import { Form, Button } from "react-bootstrap"
// import { useFormik } from "formik"
// import * as yup from "yup"
// import { Link } from "react-router-dom"
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux'
// import { UserLoginAction } from '../ReduxStore/users/userAction'

// export default function MyFormik() {
//     // const dispatch = useDispatch()
//     const formik = useFormik({
//         initialValues: {
//             email: "john@gmail.com",
//             password: "123",
//         },
//         validationSchema: yup.object({
//             email: yup
//                 .string("string is required")
//                 .required("Please enter your email address")
//                 .email("Email Must Be Valid"),
//             password: yup
//                 .string("string is required")
//                 .required("Please Enter Your Password"),
//         }),
//         onSubmit: (values) => {
//             console.log(values);
//             // dispatch(UserLoginAction(values))
//         }
//     })



//     return <>
//         {/* <ToastContainer /> */}
//         {/* {JSON.stringify(adminLogin)} */}

//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-6 offset-sm-3">
//                     <h4 h4 className='text-center text-info mt-5 fw-bold text-uppercase border-bottom border-warning text-uppercase' >Login</h4 >
//                     <Form onSubmit={formik.handleSubmit} className='mt-lg-4'>

//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>
//                                 <strong className='text-light text-center fw-bolder border-bottom border-warning text-uppercase'>
//                                     Email address
//                                 </strong>
//                             </Form.Label>
//                             <Form.Control
//                                 name='email'
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={
//                                     formik.errors.email && formik.touched.email
//                                 }
//                                 type="email"
//                                 placeholder="Enter email" />
//                             <div className="invalid-feedback fw-bolder">{formik.errors.email}</div>
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label >
//                                 <strong className='text-light text-center fw-bolder border-bottom border-warning text-uppercase'>
//                                     Password
//                                 </strong>
//                             </Form.Label>
//                             <Form.Control
//                                 name='password'
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={formik.errors.password && formik.touched.password
//                                     ? "form-control is-invalid"
//                                     : "form-control"
//                                 }
//                                 type="password"
//                                 placeholder="Password" />
//                             <div className="invalid-feedback fw-bolder">{formik.errors.password}</div>
//                         </Form.Group>

//                         <br />
//                         <Button className='col-sm-4 offset-sm-4 btn btn-outline-info fw-bolder' variant="dark" type="submit">
//                             Sign-In
//                         </Button>
//                         <hr />
//                         <div className='mt-4 text-center'>
//                             <strong className='text-light'> Not have a account ? </strong>
//                             <Link to="/signup"> Sign-Up </Link>
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     </>
// }