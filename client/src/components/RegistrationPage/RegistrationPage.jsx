import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2,
  FormLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registration} from "../../features/slice";
// import { Popup } from "../Popup/Popup.jsx";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const openPopUp = useSelector((state) => state.dataReducer.openPopUp);
  const status = useSelector(state => state.dataReducer.status)
  const [errors, setErrors] = useState({});
  const msg = useSelector((state) => state.dataReducer.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate()

const isInvalidEmail = (email)=> {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
const isInvalidPassword =(password)=>{
  let problem = ''
  if(password.length <= 8){
    problem += 'Password must be at least 8 characters.\n'
  }
  if(!/[A-Z]/.test(password) ){
    problem += "Password must include at least one uppercase letter.\n"
  }
  if(!/[a-z]/.test(password) ){
    problem += "Password must include at least one lowercase letter.\n"
  }
   if(!/\d/.test(password) ){
    problem += "Password must include at least one number.\n"
  
  }
  //  if(!/[@$!%*?&]/.test(password) ){
  //   problem += "Password must include a special character (@$!%*?&)."
  // }
return problem

}
  const checkBeforeSubmit = (newErrors) => {
    Object.keys(user).forEach((key) => {
      if (!user[key].trim()) {
        newErrors[key] = "This field is required";
      } else{
        delete newErrors[key];
      }
    });
    if(!isInvalidEmail(user.email)){
      newErrors.email = 'Invalid email format'
    }
    if(isInvalidPassword(user.password)){
      newErrors.password = `${isInvalidPassword(user.password)}`
    
    } 
    // if(isInvalidPassword(user.confirmPassword)){
    //   newErrors.confirmPassword = `${isInvalidPassword(user.confirmPassword)}`
    // }

    if (
      user.password &&
      user.confirmPassword &&
      user.password !== user.confirmPassword
    ) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors
  };

  const handleSubmit = async () => {
    const newErrors = checkBeforeSubmit({...errors});

    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
     await dispatch(registration(user));

   setUser({
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          password:'',
          confirmPassword:''
      })
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

//   useEffect(()=>{
// if(status === 'Success'){
//   navigate('/login')
// }
//   },[status,navigate])
  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        Create a new account
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid2
            size={{ xs: 12, md: 6 }}
            display={"flex"}
            flexDirection="column"
            gap={2}
          >
            <TextField
              label={!errors.email ? "Email" :`${errors.email}`  }
              placeholder={errors.email ? "Email" : ""}
              name="email"
              fullWidth
              type="email"
              value={user.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            <TextField
              label={errors.password ==='This field is required' ? `${errors.password}` : "Password" }
              placeholder={errors.password ? "Password" : ""}
              fullWidth
              type="password"
              value={user.password}
              onChange={handleChange}
              name="password"
              error={!!errors.password}
              helperText={
                errors.password === "This field is required"? '':
                (errors.password.split('\n').map((string,index)=>
                { return (<Typography key={index} variant="body2" color="error">
        {string}
      </Typography>)}))
              }  />

            <TextField
              label={
                errors.confirmPassword ==='This field is required' ? `${errors.confirmPassword}` : "Confirm Password"
              }
              placeholder={errors.confirmPassword ? "Confirm password" : ""}
              fullWidth
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              error={!!errors.confirmPassword}
              // helperText={
              //   errors.password === "too short"
              //     ? "Password must be at least 8 characters."
              //     : errors.password === "no number"
              //     ? "Password must include at least one number."
              //     : errors.password === "no special"
              //     ? "Password must include a special character (@$!%*?&)."
              //     : errors.password === "no uppercase"
              //     ? "Password must include at least one uppercase letter."
              //     : errors.password === "no lowercase"
              //     ? "Password must include at least one lowercase letter."
              //     : ""
              // }
            />
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6 }}
            display={"flex"}
            flexDirection="column"
            gap={2}
          >
            <TextField
              label={!errors.first_name ? "First name" : `${errors.first_name}`}
              placeholder={errors.first_name ? "First name" : ""}
              fullWidth
              type="text"
              value={user.first_name}
              onChange={handleChange}
              name="first_name"
              error={!!errors.first_name}
              // helperText={errors.first_name}
            />
            <TextField
              label={!errors.last_name ? "Last name" : `${errors.last_name}`}
              placeholder={errors.last_name ? "Last name" : ""}
              fullWidth
              type="text"
              value={user.last_name}
              onChange={handleChange}
              name="last_name"
              error={!!errors.last_name}
              // helperText={errors.last_name}
            />

            <TextField
              label={!errors.phone ? "Phone number" : `${errors.phone}`}
              placeholder={errors.phone ? "Phone number" : ""}
              fullWidth
              type="tel"
              inputProps={{ pattern: "[0-9+]*", maxLength: 15 }}
              value={user.phone}
              onChange={handleChange}
              name="phone"
              error={!!errors.phone}
              // helperText={errors.phone}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8 }}>
            <Button
          loading={status === 'Loading'}
          loadingPosition="end"
              variant="contained"
              color="success"
              fullWidth
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6}}>
                      <Button
                        variant="text"
                        // color="success"
                        fullWidth
                        onClick={()=>navigate('/login')}
                      >
                        Already have an account?
                      </Button>
                    </Grid2>
        </Grid2>
      </form>

    </Container>
  );
};
