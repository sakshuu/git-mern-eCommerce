import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, Paper} from '@mui/material'
import "./../assets/index.css";

export default function Curousel_mui(props)
{
    var items = [
        {   
            imgs: "https://m.media-amazon.com/images/I/61aURrton0L._SX3000_.jpg",
        },
        {
            imgs: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/TBS/GW/The-beauty-sale-Hero-PCd._CB600313844_.jpg",
        },
        {
            imgs: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg",
        }
    ]
    

    return (
        <Carousel>
            {
                items?.map( (item, i) => <img className='carousel' key={i} src={item?.imgs}  /> )
            }
        </Carousel>
    )
}

// function Item(props)
// {
//     return ( <>
//         <Paper>
//             {/* <h2>{props.item.name}</h2> */}
//             {/* <p>{props.item.description}</p> */}

//             <img className='carousel' src="https://images.unsplash.com/photo-1675789652969-ffa422802499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" alt="" />

//             {/* <Button className="CheckButton">
//                 Check it out!
//             </Button> */}
//         </Paper>
//     </>
//     )
// }