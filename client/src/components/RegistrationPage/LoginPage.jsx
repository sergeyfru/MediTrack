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
import { login, registration } from "../../features/slice";
// import { Popup } from "../Popup/Popup.jsx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const status  = useSelector((state)=> state.dataReducer.popup.type)
  const msg  = useSelector((state)=> state.dataReducer.popup.msg)
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkBeforeSubmit = (newErrors) => {
    Object.keys(user).forEach((key) => {
      if (!user[key].trim()) {
        newErrors[key] = "This field is required";
      } else {
        delete newErrors[key];
      }
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = checkBeforeSubmit({ ...errors });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      await dispatch(login(user));
      
     
      setUser({
        email: "",
        password: "",
      });
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

  const handleForgotPassword = () => {
    alert("I want to recover my password");
  };
  const handleNavigateToRegistration = () => {
    navigate("/registration");
  };
useEffect(()=>{
  if(status ==='Success'){
    navigate('/pills')
  }

},[status,navigate])


  return (
    <Container  maxWidth="xs" sx={{ border: "black 1px solid" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
          <Typography color="error">{msg}</Typography>
          <Grid2
            size={{ xs: 12 }}
            display={"flex"}
            flexDirection="column"
            gap={2}
          >
            <TextField
              label={!errors.email ? "Email" : `${errors.email}`}
              placeholder={errors.email ? "Email" : ""}
              name="email"
              fullWidth
              type="email"
              value={user.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            <TextField
              label={!errors.password ? "Password" : `${errors.password}`}
              placeholder={errors.password ? "Password" : ""}
              fullWidth
              type="password"
              value={user.password}
              onChange={handleChange}
              name="password"
              error={!!errors.password}
            />
            {/* </Grid2>

          <Grid2 size={{ xs: 12, md: 8 }} spacing={2}> */}
            <Button
                    loading={status === 'Loading'}

              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }} sx={{display:'flex', justifyContent:'center', gap:'16px'}}>
            <Typography
              variant="text"
              color="primary"
              fullWidth
              onClick={handleForgotPassword}
            >
              Forgot your password
            </Typography>

            <Typography
              // variant="text"
              color="success"
              fullWidth
              onClick={handleNavigateToRegistration}
            >
              Create a new account
            </Typography>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};
