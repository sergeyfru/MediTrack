import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addPillToUser } from "../../features/slice";
import { DailyFrequency } from "./DailyFrequency.jsx";
import { WeeklyFrequency } from "./WeeklyFrequency.jsx";
// import BasicDatePicker from "./CustomFrequency.jsx";

export const MedicationForm = ({ openAdd, setOpenAdd }) => {
  // const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    pill_name: "",
    dosage: "",
    frequency: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    times_per_day: '',
    days_of_week: [],
    custom_dates:[],
    time_of_day:[],
  });

  const [errors, setErrors] = useState({});

  const handleToggleButton = (event, newValue) => {
    
    if (newValue !== null) {
      if(newValue === 'daily'){
        
        setFormData((prev)=>({
          ...prev,
          'days_of_week': [1,2,3,4,5,6,7]
        }));
        
      }else{
        setFormData({
          ...formData,
          days_of_week: [],
        });
      }
      setFormData((prev)=>({ ...prev, frequency: newValue }));
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        frequency: "",
      }));
    }
  };

  const handleDayChange = (e) => {
    const { name, value } = e.target;

    if (name === "end_date") {
      const startDate = new Date(formData.start_date).getTime();
      const endDate = new Date(value).getTime();

      if (startDate > endDate) {

        setErrors((prev) => ({
          ...prev,
          end_date: "Must be after start date",
        }));

      } else {

        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        setErrors({
          ...errors,
          end_date: "",
        });

      }
    } else if (name === "start_date") {
      const endDate = new Date(formData.end_date).getTime();
      const startDate = new Date(value).getTime();

      if (endDate && endDate < startDate) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Must be before end date",
        }));
        setFormData((prev) => ({
          ...prev,
          [name]: '',
        }));
      } else {

        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        setErrors({
          ...errors,
          [name]: "",
        });

      }
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

  };

  const handleSubmit = () => {
    const newErrors = { ...errors };
    
    
    Object.keys(formData).forEach((key) => {

      if ( (key === "pill_name" || key === "dosage") && !formData[key].trim()) {
        newErrors[key] = "This field is required";
      }else{
        delete newErrors[key]
      }
    });

    if (Object.keys(newErrors).length > 0) {
      
      setErrors(newErrors);
    } else {
      dispatch(addPillToUser(formData));

      setFormData({
        pill_name: "",
        dosage: "",
        frequency: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
        times_per_day: '',
        days_of_week: [],
        custom_dates:[],
        time_of_day:[],
      })
      // alert("Form submitted!");
    }    

  };

  return (
    <Box
    // sx={{      flexDirection: { xs: 'column', md: 'row' }}}
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      // flexDirection={isSmallScreen ? "column" : "row"}
      gap={2}
      padding='20px'
    >
      <Box flex={1} p={1} display="flex" gap={1.5} flexDirection="column">
        <TextField
          label="Medication Name"
          name="pill_name"
          variant="outlined"
          fullWidth
          value={formData.pill_name}
          onChange={handleChange}
          error={!!errors.pill_name}
          helperText={errors.pill_name}
        />
        <TextField
          label="Dosage"
          name="dosage"
          variant="outlined"
          fullWidth
          value={formData.dosage}
          onChange={handleChange}
          error={!!errors.dosage}
          helperText={errors.dosage}
        />

        <TextField
          label="Start Date"
          name="start_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={formData.start_date}
          onChange={handleDayChange}
          error={!!errors.start_date}
          helperText={errors.start_date}
        />
        <TextField
          label="End Date"
          name="end_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={formData.end_date}
          onChange={handleDayChange}
          error={!!errors.end_date}
          helperText={errors.end_date}
        />
        {/* <TextField
        label="Additional Notes"
        name="notes"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={formData.notes}
        onChange={handleChange}
      /> */}
      </Box>
      <Box
        flex={1}
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={1.5}
      >
        <Box display="flex" flexDirection="column" textAlign="center" gap={1.5}>
          <ToggleButtonGroup
            name="frequency"
            value={formData.frequency}
            exclusive
            onChange={handleToggleButton}
            sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}
          >
            <ToggleButton
              value="daily"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.dark" },
                },
              }}
            >
              Daily
            </ToggleButton>

            <ToggleButton
              value="weekly"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "secondary.dark" },
                },
              }}
            >
              Weekly
            </ToggleButton>

            <ToggleButton
              value="custom"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "success.main",
                  color: "white",
                  "&:hover": { backgroundColor: "success.dark" },
                },
              }}
            >
              Custom
            </ToggleButton>
          </ToggleButtonGroup>

          {errors.frequency && (
            <Typography color="error">{errors.frequency}</Typography>
          )}
          {formData.frequency === "daily" ? (
            <DailyFrequency
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
              errors={errors}
            />
          ) : formData.frequency === "weekly" ? (
            <WeeklyFrequency setFormData={setFormData} formData={formData} />
          ) : formData.frequency === "custom" ? (
            <>custom</>
          ) : (
            <></>
          )}
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
