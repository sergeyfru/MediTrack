import { CronJob } from 'cron';
import {db} from '../config/db.js';
import { sendNotification } from '../utils/notificationService.js';

console.log('Cron in working');


const pillReminderSender = new CronJob('*/15 * * * *', async () => {
  try {
    console.log("🔍 Checking reminders...");

    const now = new Date();
    const timeGap = new Date(now.getTime() - 15 * 60 * 1000);

     const reminders = await db("schedules_reminders as sr")
      .join("pill_schedules as ps", "sr.schedule_id", "=", "ps.schedule_id")
      .join("pills as p", "p.pill_id", "=", "ps.pill_id")
      .join("users as u", "u.user_id", "=", "p.user_id")
      .select(
        "u.user_id",
        "sr.schedule_id",
        'reminder_id',
        "u.email",
        "sr.reminder_time",
        "sr.status",
        "p.pill_name",
        "p.dosage",
        "u.first_name",
        "u.last_name"
      )
      .where("sr.reminder_time", "<=", now)
      .andWhere("sr.reminder_time", ">", timeGap)
      .andWhere("sr.status", "pending");

    const groupedByEmail = reminders.reduce((acc, entry) => {
      const {
        user_id,
        reminder_id,
        schedule_id,
        email,
        reminder_time,
        status,
        pill_name,
        dosage,
        first_name,
        last_name,
      } = entry;

      if (!acc[email]) {
        acc[email] = {
          user: { user_id, email, first_name, last_name },
          medications: [],
        };
      }

      const exists = acc[email].medications.some(
        (med) => med.pill_name === pill_name && med.dosage === dosage
      );

      if (!exists) {
        acc[email].medications.push({ pill_name, dosage,status,reminder_id,reminder_time });
      }

      return acc;
    }, {});

    const result = Object.values(groupedByEmail);


    if (result.length > 0) {
      console.log(`📢 ${result.length} reminders found`);

      for (const reminder of result) {
        await sendNotification(reminder);

        await db("schedules_reminders")
        .whereIn("reminder_id", reminder.medications.map(med => med.reminder_id))
          .update({ status: "notified" });
      }
    }else{
      console.log("No reminders found...",now.toLocaleTimeString());
      
    }
  } catch (error) {
    console.error("❌ Error processing reminders:", error);
  }
});

pillReminderSender.start();

