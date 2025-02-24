import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export const WeeklyFrequency = ({ setFormData, formData }) => {
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const handleWeeklyFrequency = (e, newValue) => {
    console.log(newValue.sort((a, b) => a - b));
    setDaysOfWeek(newValue);
    setFormData((prev) => ({
      ...prev,
      times_per_day: "1",
      days_of_week: newValue.sort((a, b) => a - b),
    }));

    console.log(formData);

    // if(daysOfWeek.includes(newValue)){

    //     setDaysOfWeek((prev)=>(prev.filter(day=> day !== newValue)))
    // }else{
    //     setDaysOfWeek((prev)=>([...prev,newValue]))
    // }
  };
  return (
    <Box>
      <ToggleButtonGroup
        onChange={handleWeeklyFrequency}
        value={daysOfWeek}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
         {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
            ].map((day, index) => {
          return (
            <ToggleButton
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "lightgreen",
                  color: "grey",
                  "&:hover": { backgroundColor: "green", color: "white" },
                },
              }}
              value={index + 1}
            >
              {day}
            </ToggleButton>
          );
        })}
        
        {/* <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "lightgreen",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="1"
        >
          Sunday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="2"
        >
          Monday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="3"
        >
          Tuesday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="4"
        >
          Wednesday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="5"
        >
          Thursday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="6"
        >
          Friday
        </ToggleButton>
        <ToggleButton
          sx={{
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            },
          }}
          value="7"
        >
          Saturday
        </ToggleButton> */}
      </ToggleButtonGroup>
    </Box>
  );
};
