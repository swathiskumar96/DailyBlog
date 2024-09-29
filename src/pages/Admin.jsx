import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardImg, CardTitle, Modal } from 'react-bootstrap'
import Header from '../components/Header';
import { getAllBlogsAPI, removeBlogAPI } from '../services/allAPI';
import { SERVER_URL } from '../services/serverUrl';
import { Link } from 'react-router-dom';


function Admin() {
  const [searchKey,setSearchKey] = useState("")
  const [allBlogs,setAllBlogs] = useState([])
  console.log(allBlogs);

  useEffect(()=>{
    getAllBlogs()
  },[searchKey])

  
  const getAllBlogs= async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    try{
      const result = await getAllBlogsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status==200){
        setAllBlogs(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }




  const handleDeleteBlog = async (blogId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
}
//api call
const result = await removeBlogAPI(blogId,reqHeader)
if(result.status==200){
  getAllBlogs()
}else{
  console.log(result);
}
  }
}



  return (
    <>
    <Header insideDashBoard={true}/>

    <div>
      <h1 style={{marginTop:'100px'}} className='container fw-bolder'><span className='text-info'>Admin</span> Dashboard</h1>
    </div>
    <div className=' text-center mt-5'>
<Link to={'/users'}>
    <button style={{border:"darkorange 1px solid",height:"50px",fontSize:"20px"}} className='btn btn-info text-center rounded fw-bolder'><i className="fa-solid fa-users me-2"></i>Manage All Users</button>
  
</Link></div>

              <div className='container mt-5'>
            <h1 className='fw-bolder text-center mt-5'>Manage <span className='text-info'>All Blogs</span></h1>
            <input onChange={e=>setSearchKey(e.target.value)} style={{borderRadius:"50px",height:"45px"}} className='form-control w-25 float-end my-5' type="text" placeholder='Search blog by "genre" used'/>

            {
          allBlogs?.length>0?
          allBlogs?.map(blog=>(


<Card className='shadow-lg btn rounded mt-1' style={{ width: '100%'}}>
<CardBody>
<div className='row'>
 <div className='col-lg-6'>
   <CardImg style={{width:"100%", height:"30vh", border:"none"}} variant="top" src={`${SERVER_URL}/uploads/${blog?.blogImage}`} alt={blog?.title}>

   </CardImg>
 

 </div>
 <div className='col-lg-6'>
 <CardTitle>
   <h5 className='fw-bolder'>{blog?.title}</h5>

 </CardTitle>
<div className=''>
<div className='row'>
<div className='col-lg-6'>
<p className='fw-bolder'>@ {blog?.author}</p>
<p className='fw-bolder'># {blog?.genre}</p>

</div>
<div className='col-lg-6'>
<p className='fw-bolder'><i className="fa-solid fa-calendar-days"></i> {blog?.date}</p>

</div>

</div>
</div>

<div className='icons d-flex justify-content-center align-items-center'>
<button onClick={()=>handleDeleteBlog(blog?._id)} className='btn btn-info rounded fw-bolder'><i className='fa-solid fa-trash text-light me-2'></i>Delete</button>
  </div>





 </div>

</div>

</CardBody>  
</Card>
   ))
   :
<div className="fw-bolder text-warning">No Blogs Uploaded Yet</div>
}
</div>

    </>
  )
}

export default Admin