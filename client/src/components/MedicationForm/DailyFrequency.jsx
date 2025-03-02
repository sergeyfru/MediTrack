import { Box, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { TimeOfDay } from "./TimeOfDay";

export const DailyFrequency = ({
  formData,
  setFormData,
  setErrors,
  errors,
}) => {
  const [defaultTimes, setDefaultTimes] = useState("4");
  const [customTimes, setCustomTimes] = useState("");

  const handleChange = (event, newValue) => {
    if (newValue) {
 
        setDefaultTimes(newValue);
        setCustomTimes("");
        if (errors.customTimes) {
          setErrors({ ...errors, customTimes: "" });
        }
        setFormData((prev) => ({
          ...prev,
          times_per_day: newValue,
        }));
       
      
    } else {
      const value = event.target.value.trim();
      const num = Number(value);

      if (!/^\d+$/.test(value) || num < 1 || num > 24) {
        setCustomTimes(value);
        setErrors({ ...errors, customTimes: "Enter a number 1-24" });
        setFormData((prev)=>({
          ...prev,
          times_per_day: "1",
        }));
      } else {
        if (errors.customTimes) {
          setErrors({ ...errors, customTimes: "" });
        }
        setCustomTimes(value);
        setDefaultTimes("");
        setFormData({
          ...formData,
          times_per_day: value,
        });
      }
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <ToggleButtonGroup
        exclusive
        value={defaultTimes}
        onChange={handleChange}
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        //    display={"flex"} justifyContent={"space-between"}
      >
        <ToggleButton value="1">once</ToggleButton>
        <ToggleButton value="2">twice</ToggleButton>
        <ToggleButton value="3">three times a day</ToggleButton>
        <ToggleButton value="4">Other</ToggleButton>
      </ToggleButtonGroup>
      {defaultTimes && (
        <TimeOfDay
          frequency={defaultTimes}
          formData={formData}
          setFormData={setFormData}
          setErrors={setErrors}
          errors={errors}
        />
      )}
      {/* <TextField
        type="number"
        label="Enter a number 1-24"
        onChange={handleChange}
        placeholder="Other"
        value={customTimes}
        error={!!errors.customTimes}
        ></TextField> */}
    </Box>
  );
};
