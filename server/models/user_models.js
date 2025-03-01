import { nanoid } from "nanoid";
import { db } from "../config/db.js";

export const _checkUser = async ({ email, phone }) => {
  const trx = await db.transaction();
  try {
    let emailInDB = {};
    let phoneInDB = {};
    if (email) {
      [emailInDB] = await trx("users").where({ email: email });
    }
    if (phone) {
      [phoneInDB] = await trx("users").where({ phone });
    }

    await trx.commit();

    return { emailInDB, phoneInDB };
  } catch (error) {
    await trx.rollback();
    console.error("Error in Users models CheckUser =>", error);
    throw new Error("Failed =>Error in Users models CheckUser");
  }
};

export const _registration = async ({
  email,
  first_name,
  last_name,
  phone,
  password,verify_token,
}) => {
  // const user_id = 1
  const trx = await db.transaction();
  const user_id = nanoid();

  try {

    const [newUser] = await trx("users").insert(
      { user_id, email, first_name, last_name, phone ,verify_token},
      ["user_id", "email", "first_name", "last_name", "phone",'verify_token']
    );

     await trx("passwords").insert({
      user_id,
      password,
    });

    await trx.commit();

    return newUser;
  } catch (error) {
    await trx.rollback();
    console.log("Error in Users models Register =>", error);
    throw new Error("Failed =>Error in Users models Register");
  }
};

export const _login = async({ email}) =>{
const trx  = await db.transaction()
try {
  const [user] = await trx('users')
    .select(
      'user_id',
      'email',
      'first_name',
      'last_name',
      'phone',
      'email_verified'
    )
    .where('email',email)

    const [hashedPassword] = await trx('passwords').where('user_id',user.user_id).select('user_id','password')


   await  trx.commit()

    return {user,hashedPassword}


  
} catch (error) {
  await trx.rollback();
  console.log("Error in Users models Login =>", error);
  throw new Error("Failed =>Error in Users models Login");
}

};

export const _getUser = async({user_id}) =>{

  try {
    const [user] = await db('users')
    .select(
      'user_id',
      'email',
      'first_name',
      'last_name',
      'phone'
    )
    .where('email',email)

    return user
  } catch (error) {
    console.log("Error in Users models GetUser =>", error);
    throw new Error("Failed =>Error in Users models GetUser");
  }
} 
export const _verifyEmailToken = async({user_id,email}) =>{

  try {
    const user = await db('users')
    .update({ email_verified: true })
    .where('email',email)
    .andWhere('user_id',user_id)

    return user
  } catch (error) {
    console.log("Error in Users models VerifyEmailToken =>", error);
    throw new Error("Failed =>Error in Users models VerifyEmailToken");
  }
} 


