import { useDispatch, useSelector } from 'react-redux'
import './pillsItem.css'
import { removePill } from '../../features/slice'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useContext } from 'react'

export const PillsItem =( {item})=>{
    const {pill_name,pill_id,user_id,dosage,default_frequency, } = item
    
    
    const dispatch = useDispatch()

    const holdDeletePill =()=>{
        dispatch(removePill({pill_id,pill_name}))
    }
    return(
        <Card sx={{  p: 2, boxShadow: 5,  }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Name: {pill_name}
        </Typography>
        <Typography variant="body1">Dosage: {dosage}</Typography>
        <Typography variant="body1">Frequency: {default_frequency}</Typography>
        <Typography variant="body1">Next Dose:</Typography>

        <Box sx={{ display: "flex", flexWrap:'wrap', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Mark as Taken
          </Button>
          <Button variant="outlined" color="error" onClick={holdDeletePill}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
    )
}