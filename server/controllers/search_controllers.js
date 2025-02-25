import {
  _addPillToUser,
  _removePillFromUser,
  _getAllUserPills,
} from "../models/search_models.js";

export const getAllUserPills = async (req, res) => {
    
    const { user_id } = req.body;
    console.log('in getAllPills',user_id);
  try {
    const allPillsForUser = await _getAllUserPills({ user_id });
    res.json(allPillsForUser);
  } catch (error) {
    console.error("Errorr in controller");
    res.status(400).json({ msg: "Fetching Error" });
  }
};


export const addPillToUser = async (req, res) => {
  const { user_id, pill_name, dosage, frequency,start_date,end_date, times_per_day,time_of_day,days_of_week,custom_dates} = req.body;
  // res.send({msg:'OK'})
  const timesPerDay = parseInt(times_per_day,10) || null
  
  const data = { user_id, pill_name, dosage, frequency,start_date,end_date, times_per_day:timesPerDay,time_of_day,days_of_week,custom_dates}
  
  Object.keys(data).forEach((key) => {
    console.log(key,'-',data[key]);
    if(data[key] === '' || data[key] === undefined) {
      data[key] = null
    }
  });
  
  
  try {
    const newPill = await _addPillToUser(data);
    // const newPill = { user_id, pill_name, dosage, frequency,start_date,end_date, times_per_day,time_of_day,days_of_week,custom_dates}
    res.json({ msg: "Pill added successfully", pill: newPill });
  } catch (error) {
    console.error("Errorr in controller", error);
    res.status(400).json({ msg: "Adding Error" });
  }
  
};

export const removePillFromUser = async (req, res) => {
  const { user_id, pill_name, pill_id } = req.body;
  console.log(user_id, pill_name, pill_id );
  
  try {
    const removedPill = await _removePillFromUser({
      user_id,
      pill_name,
      pill_id,
    });

    res.json({ msg: "Pill removed successfully", pill: removedPill });
  } catch (error) {
    console.error("Errorr in controller", error);
    res.status(400).json({ msg: "Removing Error" });
  }
};
