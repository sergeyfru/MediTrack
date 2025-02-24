import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addPillToUser } from "../../features/slice";
import './addPill.css'
import {MedicationForm} from "../MedicationForm/MedicationForm.jsx";
import { Box } from "@mui/material";

export const AddPill = ({openAdd, setOpenAdd}) => {
  const [pill_name, setPill_name] = useState("");
  const [dosage, setDosage] = useState("");
  const [default_frequency, setDefault_frequency] = useState("");

  const dispatch = useDispatch();
  
  const closeAddPill =() =>{
    setOpenAdd(false)
  }
  const holdSubmit = (e) => {
    e.preventDefault();
    if (pill_name.trim() === "") {
      alert("Enter the name of the medication");
      return;
    }
    if (dosage.trim()==='') {
      alert("Enter the medication dosage");
      return;
    }

    dispatch(
      addPillToUser({
        pill_name,
        dosage,
        default_frequency,
      })
    );
    closeAddPill
    setDefault_frequency('')
    setDosage('')
    setPill_name('')
  };

return (
  <Box>

  </Box>
)

  // return (
  //   <div className="addpill">
  //           {console.log('render AddPill')}

  //       <h3>Add medication</h3>
  //       <button className='closeBtn' onClick={closeAddPill}>X</button>
  //     <form onSubmit={(e) => holdSubmit(e)}>
  //       <input
  //         type="text"
  //         placeholder="Name"
  //         value={pill_name}
  //         onChange={(e) => setPill_name(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Dosage"
  //         value={dosage}
  //         onChange={(e) => setDosage(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Frequency"
  //         value={default_frequency}
  //         onChange={(e) => setDefault_frequency(e.target.value)}
  //       />
  //     </form>
  //       <button type="submit" className="addpPillBtn" onClick={(e)=>holdSubmit(e)}>Add</button>
  //       <MultiInputForm />
  //   </div>
  // );
};
