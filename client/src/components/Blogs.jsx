import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from './BlogCard';
import { Stack } from '@mui/material';
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/blog/getblogs/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      setBlogs(data); // Set the blogs data to state
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }finally{
    setLoading(false)
  }
  };


  useEffect(() => {
    fetchBlogs(); // Initial fetch
  }, []);

  return (
    <div style={{width:"100vw",margin:"15px 0 0 0"}}>
        {blogs.length > 0 ? 
        <Stack width={"100vw"} direction={"row"} alignItems={"center"} flexWrap={"wrap"} justifyContent={"space-around"} >
          {blogs.map((blog)=>{
            return <div style={{minWidth:"300px",margin:"0 0 56px 0"}} key={blog.id}>
              <BlogCard blog={blog}/>
            </div>
          })}
          </Stack>
        : <p>No blogs found.</p>}
        </div>
  );
};

export default Blogs;
