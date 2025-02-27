import "./medicalList.css";
import { ListOfPills } from "../ListOfPills/ListOfPills";
import { useDispatch, useSelector } from "react-redux";
import { getAllPills } from "../../features/slice.js";
import { useEffect, useState } from "react";
import { AddPill } from "../AddPill/AddPill.jsx";
import { MedicationForm } from "../MedicationForm/MedicationForm.jsx";
import { Box, Button, Typography } from "@mui/material";

export const MedicalList = () => {
    const [openAdd,setOpenAdd] = useState(false)
  const dispatch = useDispatch();
  const pillsToShow = useSelector((state) => state.dataReducer.allPills );
  useEffect(() => {
    dispatch(getAllPills());
  }, []);

  const addPill =  () => {
    setOpenAdd(!openAdd)
  };

  return (
    <Box position={"relative"}>
      <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center",  justifyContent:"space-between",  gap: 2 }}>
        <Typography sx={{ display: "flex", alignItems: "center"}} variant="h5" >Medication List</Typography>
        <Button variant="contained" onClick={addPill}>Add Medication</Button>
      </Box>
      { openAdd && <MedicationForm openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {/* { <MedicationForm openAdd={openAdd} setOpenAdd={setOpenAdd} />} */}
   <ListOfPills pillsToShow={pillsToShow} />


    </Box>
    // <div className="medicallist">
    //         {console.log('render MedicalList')}

    //   <div className="medicallist-tittle">
    //     <h2>Medication List</h2>
    //     {/* <button onClick={(e)=>getAllPils(e)}>All pills</button> */}
    //     <button onClick={addPill}>Add Medication</button>
    //   </div>
    //   {/* { openAdd && <AddPill openAdd={openAdd} setOpenAdd={setOpenAdd} />} */}
    //   { openAdd && < MultiInputForm/>}
    //   <ListOfPills pillsToShow={pillsToShow} />
    // </div>
  );
};
