import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { getAllProductsAction } from '../redux/users/action/productAction';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getproducts } from '../redux/users/reducer/productReducer';
import { Alert, CircularProgress } from '@mui/material';


export default function BestsellerProducts() {
  const dispatch = useDispatch()
  const {products, loading, productsError } = useSelector(getproducts)
useEffect(() => {
  dispatch(getAllProductsAction())
}, [])

console.log(loading);

if (products.lenght  === 0 ) {
 return `<h1>Np Products Found</h1>`
}
if (loading) {
 return <CircularProgress/>
}
if (productsError) {
 return <Alert variant="error">{productsError}</Alert>
}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              products.map(item => <Grid item xs={2} sm={4} md={4} key={item._id}><ProductCard product={item}/></Grid>)
            }
      </Grid>
    </Box>
  );
}