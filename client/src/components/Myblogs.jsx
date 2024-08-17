import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import { Stack } from '@mui/material';
// import { Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
const Myblogs = (props) => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    const fetchBlogs = async () => {
        
        const token = sessionStorage.getItem('accessToken'); 
        console.log(token,"Inside myblogs");
        
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/blog/getuserblogs/', {
                      method: 'GET',
                      headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`, 
                      }
                    });

                    // if (!response.ok) {
                    //     throw new Error('Network response was not ok');
                    // }

                    const data = await response.json();
                    console.log(data)
                    setBlogs(data); // Set the blogs data to state
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            } else {
                console.log('No access token found in session storage');
            }
      };

      useEffect(()=>{
        fetchBlogs()
      },[])
  return (
    <div style={{width:"100vw",margin:"15px 0 0 0"}}>
        {blogs.length > 0 ? 
        <Stack width={"99vw"} direction={"row"} alignItems={"center"} flexWrap={"wrap"} justifyContent={"space-around"} >
          {blogs.map((blog)=>{
            return <div style={{minWidth:"357px",width:"27%",margin:"0 0 56px 0"}} key={blog.id}>
              <BlogCard blog={blog}/>
            </div>
          })}
          </Stack>
        : <p>No blogs found.</p>}
        </div>
  )
}

export default Myblogs
