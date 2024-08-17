import { Box,Paper, Typography, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

const Createblog = (props) => {
    const [blog, setBlog] = useState({title:"", content: ""});
	const navigate = useNavigate();
    const [isSaving,setIsSaving] = useState(false);

    const handleChange = (e) => {
		setBlog({ ...blog, [e.target.name]: e.target.value });
	};


      const handleSave=async()=>{
        setIsSaving(true)
        const token = sessionStorage.getItem('accessToken'); 
        console.log(token,blog)

        const response = await fetch('http://localhost:8000/blog/create/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(blog),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Blog created:', data);
            setIsSaving(false)
            navigate('/myblogs')
        } else {
            setIsSaving(false)
            console.error('Failed to create blog:', response.statusText);
        }
      };

  return (
    <Paper sx={{height:"470px",width:"70vw",minWidth:"300px",paddingX:"10px",paddingY:"20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography variant="h4" sx={{color:"black",marginBottom:"20px"}}>Start Creating your Blog</Typography>
            <TextField sx={{color:"black",marginBottom:"20px",width:"80%"}} name='title' onChange={handleChange} id="outlined-basic" label="Title" variant="standard" />
            <TextField sx={{color:"black",marginBottom:"20px",width:"80%"}} name='content' onChange={handleChange} 
          id="outlined-multiline-flexible"
          label="Content"
          multiline
          rows={10}
        />
            <button onClick={handleSave} disabled={isSaving} style={{margin:"0 0 10px 0"}}>
                {isSaving?"isSaving...":"Save this Blog"}
            </button>
        </Paper>
  )
}

export default Createblog
