import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Pick a date"
        inputFormat="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}








// import { useState } from "react";
// // import {LocalizationProvider,DesktopDatePicker,AdapterDateFns } from '@mui/x-date-pickers'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { TextField } from "@mui/material";

// export const CustomFrequency =  ()=> {
//     const [selectedDate, setSelectedDate] = useState(null);
  
//     const handleChange = (newValue) => {
//       setSelectedDate(newValue);
//     };
  
//     return (
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DesktopDatePicker
//           label="Pick a date"
//           inputFormat="MM/dd/yyyy"
//           value={selectedDate}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     );
//   }