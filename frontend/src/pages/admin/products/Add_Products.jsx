import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FormControl, Input, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { addProductAction } from "../../../redux/admin/actions/employeeProductAction";
const theme = createTheme({
  color: "red",
});
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function Add_Products() {

  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [image, setimage] = React.useState([])
  const formik = useFormik({
    initialValues: {
      name: "product 1",
      brand: "product",
      category: "electronics",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing.",
      price:"999",
      stock:"10",
      // publish:""
      // images:""
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
    // onSubmit: (values, e  }) => {
      console.log(values);
      const fd = new FormData()
      fd.append("name", values.name)
      fd.append("brand", values.brand)
      fd.append("category", values.category)
      fd.append("desc", values.desc)
      fd.append("price", values.price)
      fd.append("stock", values.stock)
      // fd.append("images", values.images)
      for (let item of image) {
        fd.append("images", item)
      }
      for (const item of fd.entries()) {
        console.log(item);
    }
      console.log(fd);
      console.log("hrllo");
      dispatch(addProductAction(fd))
      resetForm();

    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ bgcolor: "secondary" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            bgcolor: "danger",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "revert-layer",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
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
                  // autoComplete="email"
                />
                <Typography
                  sx={{ color: "red", fontFamily: "revert-layer" }}
                  className="invalid-feedback"
                >
                  {formik.errors.stock}
                </Typography>
              </Grid>

              <Grid item xs={12}>

              <Input type='file' inputProps={{ multiple: true }} onChange={e => setimage(e.target.files)} placeholder="ff"></Input>

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
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleRegister}
            >
              Add Product
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}