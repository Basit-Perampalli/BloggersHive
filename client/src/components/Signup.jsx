import { Box,Paper, Typography, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';


const Signup = (props) => {
    const [data, setData] = useState({ first_name: "",last_name:"",email:"", password: "" });
	let navigate = useNavigate();

    const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const handleRegister= async()=>{
        // console.log(data);
        
        try {
            const response = await fetch("http://localhost:8000/auth/register/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Error registering user:', errorData);
              return;
            }
        
            const received_data = await response.json();
            console.log('Registration successful:', received_data);
            localStorage.setItem('accessToken', received_data.access);
            localStorage.setItem('refreshToken', received_data.refresh);
            console.log(localStorage.getItem('accessToken'));
            
            navigate('/')
            props.setIsLogin(true)
          } catch (error) {
            console.error('Error during registration:', error);
          }
    }



  return (
        <Paper sx={{height:"530px",width:"30vw",minWidth:"300px",paddingX:"10px",paddingY:"20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h2" sx={{color:"black",marginBottom:"10px"}}>BloggersHive</Typography>
            <Typography variant="h4" sx={{color:"black",marginBottom:"20px"}}>LOGIN</Typography>
            <TextField sx={{color:"black",marginBottom:"20px"}} name='first_name' onChange={handleChange} id="outlined-basic" label="First Name" variant="outlined" />
            <TextField sx={{color:"black",marginBottom:"20px"}} name='last_name' onChange={handleChange} id="outlined-basic" label="Last Name" variant="outlined" />
            <TextField sx={{color:"black",marginBottom:"20px"}} name='email' onChange={handleChange} id="outlined-basic" label="Email" variant="outlined" />
            <TextField sx={{color:"black",marginBottom:"20px"}} name='password' onChange={handleChange} id="outlined-basic" label="Password" variant="outlined" />
            <button onClick={handleRegister} style={{margin:"0 0 10px 0"}}>
                Register
            </button>
            Already have an account.<a onClick={()=>navigate('/login')} >Login Here</a>
        </Paper>
  )
}

export default Signup
