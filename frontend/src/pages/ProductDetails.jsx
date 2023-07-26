import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsDetailAction } from '../redux/users/action/productAction';
import { Link, useParams } from 'react-router-dom';
import { URL } from '../redux/api';
import { getproducts } from '../redux/users/reducer/productReducer';
import { addToCartAction, cartHistoryAction } from '../redux/users/action/cartAction';
import { getcartData } from '../redux/users/reducer/cartReducer';

const ProductDetails = () => {
  const [qty, setQty] = useState(1)
const dispatch = useDispatch()
const [currentImg, setCurrentImg] = useState(0)
const {singleProducts} = useSelector(getproducts)
const {toggle} = useSelector(getcartData)
const {id} = useParams()
useEffect(() => {
  dispatch(getProductsDetailAction(id))
}, [])
 useEffect(() => {
dispatch(cartHistoryAction())
 }, [toggle])

if (singleProducts.images) {
  return  <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid sm={6}>
      <Grid container spacing={2}>
       <Grid xs={2}>
       <Stack direction="column" spacing={2}>
        {
 singleProducts.images.map((item, i) => <img 
  onMouseOver={e => {setCurrentImg(i)
  console.log(item);}
  }
  src={`${item}`} alt=""/>)
        }
    </Stack>
</Grid>

<Grid xs={10}>
  {
 <img src={`${singleProducts.images[currentImg]}`} alt={singleProducts.name}/>
  }
    </Grid>
{/* <Grid xs={10}>
  {
 <img src={`${URL}/${singleProducts.images[0]}`} alt={singleProducts.name}/>
  }
    </Grid> */}
      </Grid>

{
  singleProducts.stock > 0 ? <>
        <Grid container spacing={2}>
      <Grid mdOffset={4} md={4}>
      <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={e => setQty(qty === 1 ? 1 : qty - 1)}>-</Button>
      <h1>{qty}</h1>
      <Button variant="contained" onClick={e => setQty(singleProducts.stock === qty ? qty : qty + 1)}>+</Button>
    </Stack>
        </Grid>

        <Grid mdOffset={3} md={6}>
      <Stack spacing={2} direction="row">

      <Button
       variant="outlined"
      color='error'
      > <Link to={`/user/buynow/${id}/${qty}`} className='nav-link'> Buy Now</Link></Button>

      <Button variant="contained" onClick={e => {
        dispatch(addToCartAction({productId: singleProducts._id, qty}))
      }}>Add To Card</Button>
    </Stack>
        </Grid>
      </Grid>
  </>
  :   <h1>Out Off Stock</h1>
  
  }

        </Grid>
        <Grid sm={6}>
        <Typography variant='h4'>{singleProducts.name}</Typography>
        <Typography variant='h5'>{singleProducts.price}</Typography>
        <Typography>{singleProducts.desc}</Typography>
        </Grid>
        
      </Grid>
    </Box>
  </>
  }
}

export default ProductDetails