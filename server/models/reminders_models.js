import { db } from "../config/db.js";

export const _addReminderToSchedule = async (pillSchedule) => {
  try {
    const {
      frequency,
      start_date,
      end_date,
      times_per_day,
      time_of_day,
      days_of_week,
      custom_dates,
    } = pillSchedule;

    const reminders = [];
    const scheduleId = pillSchedule.schedule_id;
    const today = new Date();

    let periodEnd;

    if (
      start_date &&
      new Date(start_date).getDate() ===
        new Date(
          start_date.getFullYear(),
          start_date.getMonth() + 1,
          0
        ).getDate()
    ) {
      periodEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    } else {
      periodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      // periodEnd.setUTCHours(23, 59, 59, 999)
    }

    let currentDate = new Date(
      start_date ? Math.max(new Date(start_date), today) : today
    );

    while (currentDate <= periodEnd) {
      if (end_date && currentDate > new Date(end_date)) break;

      const formattedDate = currentDate.toISOString().split("T")[0];

      if (frequency === "daily") {
        time_of_day.forEach((time) => {
          reminders.push({
            schedule_id: scheduleId,
            reminder_time: new Date(`${formattedDate}T${time}`),
            status: "pending",
          });
        });
      } else if (frequency === "weekly") {
        if (days_of_week.includes(currentDate.getDay())) {
          time_of_day.forEach((time) => {
            reminders.push({
              schedule_id: scheduleId,
              reminder_time: new Date(`${formattedDate}T${time}`),
              status: "pending",
            });
          });
        }
      } else if (frequency === "custom") {
        if (custom_dates.includes(formattedDate)) {
          time_of_day.forEach((time) => {
            reminders.push({
              schedule_id: scheduleId,
              reminder_time: new Date(`${formattedDate}T${time}`),
              status: "pending",
            });
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (reminders.length > 0) {
      await db("schedules_reminders").insert(reminders);
    }

    return reminders;
  } catch (error) {
    console.error("Error adding reminders to schedule", error);
    throw error;
  }
};
