import { Alert, Box, Button, CircularProgress, createTheme, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../../components/ProductCard'
import { deleteEmployeProduct, getEmployeProduct, updateEmployeProduct } from '../../../redux/admin/actions/employeeProductAction'
import {  employeeproducts } from '../../../redux/admin/reducers/employeeProductReducer'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from "yup";

const drawerWidth = 460;
const theme = createTheme({
  color: "red",
});
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const [productUpdate, setProductUpdate] = useState()
  const [open, setOpen] = React.useState(false);
  const [image, setimage] = React.useState([])

  const {loading, employeeProduct, productError,productEdit,  productDelete } = useSelector(employeeproducts)

useEffect(() => {
  dispatch(getEmployeProduct())
}, [productUpdate,productEdit,productDelete])


const formik = useFormik({
  enableReinitialize:true,
  initialValues: {
    name: productUpdate?.name,
    brand: productUpdate?.brand,
    category: productUpdate?.category,
    desc:productUpdate?.desc,
    price:productUpdate?.price,
    stock:productUpdate?.stock,
  },
  validationSchema: yup.object({
    name: yup
        .string()
        .required("Please Enter Product name"),

    brand: yup
        .string()
        .required("Please Enter Your brand"),

    category: yup
      .string()
      .required("Please Enter Your category "),

    desc: yup
      .string()
      .required("Please Enter Your desc "),

    price: yup
       .number()
       .required("Please Enter Your Confirm price "),

    stock: yup
       .number()
       .required("Please Enter Your Confirm stock "),
       
  }),
  onSubmit: (values, { resetForm }) => {
    const fd = new FormData()
    fd.append("name", values.name)
    fd.append("brand", values.brand)
    fd.append("category", values.category)
    fd.append("desc", values.desc)
    fd.append("price", values.price)
    fd.append("stock", values.stock)

    for (let item of image) {
      fd.append("images", item)
    }
    for (const item of fd.entries()) {
      console.log(item);
  }
    dispatch(updateEmployeProduct(productUpdate._id,fd))
    resetForm();
  },
});


if (employeeProduct.lenght === 0 ) {
 return `<h1>Np Products Found</h1>`
}
if (loading) {
 return <CircularProgress/>
}
if (productError) {
 return <Alert variant="error">{productError}</Alert>
}

const handleDelete = (productID) => {
  dispatch(deleteEmployeProduct(productID))
}
const handleDrawerOpen = () => {
    setOpen(true);
};
const handleDrawerClose = () => {
    setOpen(false);
};

  return <>
<Box sx={{ display: 'flex' }}>
    <Main open={open}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          {  <h2>{JSON.stringify(formik.values)}</h2>  }
          {  <h2>{JSON.stringify(productUpdate)}</h2>  }
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              employeeProduct.map(item =>  <>
              <Grid item xs={2} sm={4} md={4} key={item._id}>
                <ProductCard product={item}/>
                <Box sx={{ marginTop:"3px" }}>

                <Button
            aria-label="open drawer"
            edge="end"
            variant="contained"
            color="success"
            onClick={e => {
              setProductUpdate(item); 
              handleDrawerOpen()
            }}
            >
            Update
          </Button>
                <Button variant="contained" color="error" onClick={e => handleDelete(item._id)}>Delete</Button>
                </Box>
                </Grid>
              </>
                )
            }
      </Grid>
    </Box>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            padding:"10px"
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <Typography variant='h5'>Edit Product Form</Typography>
          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />} 
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        <CssBaseline />
        <Box
          sx={{
            bgcolor: "danger",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "revert-layer",
          }}
        >

          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.name && formik.touched.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="name"
                  label="First Name"
                  name="name"
                  autoComplete="email"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.brand && formik.touched.brand
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="name"
                  label="Brand"
                  name="brand"
                  // autoComplete="email"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.brand}
                </Typography>
              </Grid>

              <Grid item xs={12}>
              <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.category && formik.touched.category
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="categorye"
                  label="Category"
                  name="category"
    labelId="demo-simple-select-label"
  >
    <MenuItem value="cloths">Cloths</MenuItem>
    <MenuItem value="electronics">Electronics</MenuItem>
    <MenuItem value="gadgets">Gadgets</MenuItem>
    <MenuItem value="footware">Footware</MenuItem>
  </Select>
</FormControl>
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.category}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.desc && formik.touched.desc
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="name"
                  label="Desc"
                  name="desc"
                  autoComplete="email"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.desc}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.price && formik.touched.price
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="price"
                  label="Price"
                  name="price"
                  // autoComplete="email"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.price}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.stock && formik.touched.stock
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="name"
                  label="Stock"
                  name="stock"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.stock}
                </Typography>
              </Grid>

              <Grid item xs={12}>

              <Input type='file' inputProps={{ multiple: true }} onChange={e => setimage(e.target.files)} ></Input>

              </Grid>

              <Grid item xs={12} style={{display:"flex", gap:"7px", marginTop:"10px"}}>
              <InputLabel id="demo-simple-select-label">Publish</InputLabel>
              <Switch {...label} />
              </Grid>



            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleDrawerClose}
            >
              Update Product 
            </Button>
          </Box>
        </Box>
        </List>

      </Drawer>

    </Box>


  </>
}

export default Products