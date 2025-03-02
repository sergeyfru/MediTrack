import { db } from "../config/db.js";

// const trx = await db.transaction();

export const _getAllUserPills = async ({ user_id }) => {
  try {
    const pills = await db('pills as p')
      .join('pill_schedules as ps', 'p.pill_id', '=', 'ps.pill_id')
      .join('schedules_reminders as sr','ps.schedule_id','=','sr.schedule_id')
      .select(
        'p.pill_id',
        'p.pill_name',
        'p.dosage',
        'p.default_frequency',
        // db.raw('array_agg(sr.reminder_time,) as reminders'),
        db.raw(`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'reminder_time', sr.reminder_time,
              'reminder_id', sr.reminder_id,
              'status', sr.status,
              'schedule_id', sr.schedule_id
            )
          ) AS reminders
        `),
        'ps.frequency',
        'ps.start_date',
        'ps.end_date',
        'ps.times_per_day',
        'ps.time_of_day',
        'ps.days_of_week',
        'ps.custom_dates'
      )
      .where('p.user_id', user_id)
      .groupBy(
        "p.pill_id",
        "p.pill_name",
        "p.dosage",
        "p.default_frequency",
        "ps.frequency",
        "ps.start_date",
        "ps.end_date",
        "ps.times_per_day",
        "ps.time_of_day",
        "ps.days_of_week",
        "ps.custom_dates"
      );
    return pills;
  } catch (error) {
    console.error("Error fetching pills:", error);
    throw error;
  }
};

export const _addPillToUser = async ({
  user_id,
  pill_name,
  dosage,
  frequency,
  start_date,
  end_date,
  times_per_day,
  time_of_day,
  days_of_week,
  custom_dates,
}) => {

  const trx = await db.transaction();

  try {
    const [newPill] = await trx("pills").insert(
      {
        user_id, pill_name, dosage,
        'default_frequency': frequency,
      },
      ["pill_id", "user_id", "pill_name", "dosage", "default_frequency"]
    );
    
    const [pillSchedules] = await trx("pill_schedules").insert({
      'pill_id':newPill['pill_id'], frequency,
      start_date, end_date, times_per_day,
      time_of_day, days_of_week, custom_dates,
    },['schedule_id','frequency','start_date', 'end_date', 'times_per_day',
      'time_of_day', 'days_of_week', 'custom_dates']);

    await trx.commit();
    const pillToSend = {...newPill, ...pillSchedules}
    // console.log(pillToSend);
    
    return pillToSend;
  } catch (error) {
    await trx.rollback();
    console.error("Error adding pill to user", error);
    throw error;
  }
};

export const _removePillFromUser = async ({ user_id, pill_name, pill_id }) => {
  try {
    // const query = db("pills").where("user_id", user_id);

    // if (pill_name) {
    //   query.andWhere("pill_name", pill_name);
    // }

    // if (pill_id) {
    //   query.andWhere("pill_id", pill_id);
    // }

    const deletedPill = await db("pills")
      .del()
      .where({ user_id, pill_name, pill_id })
      .returning([
        "pill_id",
        "user_id",
        "pill_name",
        "dosage",
        "default_frequency",
      ]);

    return deletedPill;
  } catch (error) {
    console.error("Error removing pill from user", error);
    throw error;
  }
};
