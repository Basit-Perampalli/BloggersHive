import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';


const BlogCard = (props) => {
  // const [openDelete,setOpenDelete] = useState(false);
  // const [openEdit,setOpenEdit] = useState(false);

  // const handleOpenDelete=()=>{
  //   setOpenDelete(true)
  // }
  // const handleOpenEdit=()=>{
  //   setOpenEdit(true)
  // }
  const handleDelete=async(blogId)=>{
    const del = prompt("To confirm delete. Write 'delete'")
    if (del!=='delete'){
      return
    }
    const token = localStorage.getItem('accessToken'); // Retrieve the token from session storage

    const response = await fetch(`http://localhost:8000/blog/delete/${blogId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        console.log('Blog deleted successfully');
        props.fetchBlogs()
        // Handle the success (e.g., update the UI, fetch new list of blogs, etc.)
    } else {
        console.error('Error:', response.statusText);
        // Handle the error (e.g., display an error message)
    }
  }
  const handleEdit=()=>{
    
  }

    const blog = props.blog
  return (
    <Card sx={{height:"300px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.author}
          </Avatar>
        }
        title={blog.title}
        subheader={"Created at: "+blog.created_at}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent >
        <Typography variant="body2" color="text.secondary">
          {blog.content}
        </Typography>
      </CardContent>
      {props.ismyblog?
      <CardActions sx={{justifyContent:"space-around",marginTop:"110px"}}>
        <IconButton onClick={()=>handleDelete(blog.id)} aria-label="delete blog">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleEdit} aria-label="edit blog">
          <EditIcon />
        </IconButton>
      </CardActions>:""}
      
    </Card>
  
  )
}

export default BlogCard
