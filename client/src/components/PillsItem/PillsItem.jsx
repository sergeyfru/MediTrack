import { useDispatch, useSelector } from "react-redux";
import "./pillsItem.css";
import { removePill } from "../../features/slice";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export const PillsItem = ({ item }) => {
  const { pill_name, pill_id, user_id, dosage, default_frequency, reminders } =
    item;
  const now = new Date();
  const showDateToUser = (allReminders, which) => {

    const sortedReminders = allReminders.sort(
      (a, b) => new Date(a.reminder_time) - new Date(b.reminder_time)
    );
    let reminder = null;
    if (which === "Next") {
      reminder = sortedReminders.find((r) => new Date(r.reminder_time) > now);
    } else if (which === "Previous") {
      reminder = [...sortedReminders]
        .reverse()
        .find((r) => new Date(r.reminder_time) < now);
    }

    if (reminder) {
      const date = new Date(reminder.reminder_time);

      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = date.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return {
        ...reminder,
        showToUser: `${which} reminder: ${formattedDate} в ${formattedTime}`,
      };
    } else {
      return { ...reminder, showToUser: `No ${which.toLowerCase()} reminders` };
    }
  };

  const previousReminder = showDateToUser([...reminders], "Previous");
  const upcomingReminder = showDateToUser([...reminders], "Next");

  const dispatch = useDispatch();

  const holdDeletePill = () => {
    dispatch(removePill({ pill_id, pill_name }));
  };
  return (
    <Card sx={{ p: 2, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Name: {pill_name}
        </Typography>
        <Typography variant="body1">Dosage: {dosage}</Typography>
        <Typography variant="body1">Frequency: {default_frequency}</Typography>
        {previousReminder && (
          <Typography variant="body1">{previousReminder.showToUser}</Typography>
        )}
        {upcomingReminder && (
          <Typography variant="body1">{upcomingReminder.showToUser}</Typography>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Mark as Taken
          </Button>
          <Button variant="outlined" color="error" onClick={holdDeletePill}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
