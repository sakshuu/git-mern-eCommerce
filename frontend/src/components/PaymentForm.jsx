import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function PaymentForm({setMode}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3} marginTop={10} paddingX={10}>
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Choose payment method</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="online"
    name="radio-buttons-group"
  >
    <FormControlLabel value="cod"onChange={e => setMode(e.target.value)}  control={<Radio />} label="pay on Delivery" />
    <FormControlLabel value="online" onChange={e => setMode(e.target.value)} control={<Radio />} label="pay online" />
  </RadioGroup>
</FormControl>
{/* <Button variant='outlined'>Pay on Delivery</Button> */}
      </Grid>
    </React.Fragment>
  );
}