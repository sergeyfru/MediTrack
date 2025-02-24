import { useDispatch, useSelector } from 'react-redux';
import { PillsItem } from '../PillsItem/PillsItem';
import './listOfPills.css'
import { useEffect } from 'react';
import { getAllPills } from '../../features/slice';
import { Box, Grid2 } from '@mui/material';

export const ListOfPills = ({pillsToShow}) => {
  const status = useSelector(state => state.pillsReducer.status)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllPills());
  }, []);
  return (

    <Grid2 container spacing={2}>
  {status ==='Success' && pillsToShow.map((item, index) => (
    <Grid2 item  key={index} size={{xs:12,sm:6,lg:4}}>
      {/* <Box sx={{ bgcolor: ["lightblue", "lightcoral", "lightgreen"][index % 3], p: 2 }}> */}
        <PillsItem key={index} item={item}/>
      {/* </Box> */}
    </Grid2>
  ))}
</Grid2>
    // <Box sx={{display:'flex',flexWrap:'wrap', }}>
    //   {status ==='Success' && pillsToShow.map((item,i)=>{        
    //     return 
    //   })}
    // </Box>


    // <div className="listOfPills">
    //         {console.log('render ListOfPills')}

    //   {status ==='Success' && pillsToShow.map((item,i)=>{        
    //     return <PillsItem key={i} item={item}/>
    //   })}
        
    // </div>
  );
};
