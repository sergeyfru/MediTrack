import { Box, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export const TimeOfDay = ({ frequency, formData, setFormData }) => {
  const [selectedTimes, setSelectedTimes] = useState(
    Array.from({ length: parseInt(frequency) }).map((_, i) => '')
  );
  const [customInterval, setCustomInterval] = useState(frequency);

  const handleCustomIntervalChange = (event, newIntervals) => {
    setCustomInterval(newIntervals);
    const step = parseInt(newIntervals);
    const newTimesArr = Array.from({ length: 24 / step }, (_, i) => {
      return String(i * step).padStart(2, "0") + ":00";
    });
    setSelectedTimes(newTimesArr);
    setFormData((prev) => ({
      ...prev,
      time_of_day: newTimesArr,
    }));
  };

  const handleSelectedTimeChange = (event, index) => {
    const newTime = [...selectedTimes];
    newTime.length = frequency;
    newTime[index] = event.target.value;
    setSelectedTimes(newTime);
    if (newTime.length == frequency) {
      setFormData((prev) => ({
        ...prev,
        time_of_day: newTime,
      }));
    } else {
      const errorsArr = Array.from(parseInt(frequency)).map((_, i) => "");

      errorsArr[index] = "Select time";
      console.log(errorsArr);

      setErrorTime(errorsArr);
      setErrors((prev) => ({
        ...prev,
        time_of_day: errorsArr,
      }));
    }
  };

  return (
    <Box pt={2} display="flex" flexDirection={"column"} gap={2}>
      {frequency !== "4" ? (
        <Box display="flex" flexWrap={"wrap"} gap={2}>
          {Array.from({ length: parseInt(frequency) }).map((_, i) => (
            <TextField
              key={i}
              type="time"
              value={selectedTimes[i] || ""}
              onChange={(e) => handleSelectedTimeChange(e, i)}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <ToggleButtonGroup
            value={customInterval}
            exclusive
            onChange={handleCustomIntervalChange}
          >
            {["6", "4", "3", "2", "1"].map((frequency, i) => {
              return (
                <ToggleButton key={i} value={frequency}>
                  Every {frequency !== "1" ? `${frequency} hours` : "hour"}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          <span style={{ marginTop: "4px" }}>
            <strong style={{ marginRight: "4px" }}>Selected Times: </strong>{" "}
            {selectedTimes.length < 12 ? (
              <> {selectedTimes.join(", ")} </>
            ) : selectedTimes.length === 12 ? (
              <> Every two hours</>
            ) : (
              <> Every hour</>
            )}
          </span>
        </Box>
      )}

      {console.log(selectedTimes.length)}
    </Box>
  );
};
