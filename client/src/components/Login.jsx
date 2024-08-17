import { Box,Paper, Typography, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

const Login = (props) => {
	const [data, setData] = useState({email:"", password: "" });
	let navigate = useNavigate();

    const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const handleLogin= async()=>{
        console.log(data);
        
        try {
            const response = await fetch("http://localhost:8000/auth/login/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            console.log(response);
            
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Invalid Credentials', errorData);
              return;
            }
        
            const received_data = await response.json();
            console.log('Registration successful:', received_data);
            sessionStorage.setItem('accessToken', received_data.access);
            sessionStorage.setItem('refreshToken', received_data.refresh);
            props.setIsLogin(true)
            navigate('/')
          } catch (error) {
            console.error('Error during registration:', error);
          }
    }



  return (

        <Paper sx={{height:"470px",width:"30vw",minWidth:"300px",paddingX:"10px",paddingY:"20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography variant="h2" sx={{color:"black",marginBottom:"10px"}}>BloggersHive</Typography>
            <Typography variant="h4" sx={{color:"black",marginBottom:"20px"}}>LOGIN</Typography>
            <TextField sx={{color:"black",marginBottom:"20px"}} name='email' onChange={handleChange} id="outlined-basic" label="Email" variant="outlined" />
            <TextField sx={{color:"black",marginBottom:"20px"}} name='password' onChange={handleChange} id="outlined-basic" label="Password" variant="outlined" />
            <button onClick={handleLogin} style={{margin:"0 0 10px 0"}}>
                Login
            </button>
            Don't have an account.<a onClick={()=>navigate('/register')} >Register Here</a>
        </Paper>
  )
}

export default Login
