import React, { useContext, useEffect, useState } from 'react'
import cover from '../assets/hero3.png'
import {Card, CardBody, CardImg, CardTitle, Modal } from 'react-bootstrap'
import Add from './Add'
import Edit from './Edit'
import { getUserBlogsAPI, removeBlogAPI } from '../services/allAPI'
import { SERVER_URL } from '../services/serverUrl'
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI'


function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)

  const {addResponse,setAddResponse} = useContext(addResponseContext)

  const [userBlogs,setUserBlogs] = useState([])

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    console.log(userBlogs);
    useEffect(()=>{
      getUserBlogs()
    },[addResponse,editResponse])
    const getUserBlogs= async()=>{
      const token = sessionStorage.getItem("token")
      const reqHeader ={
        "Authorization": `Bearer ${token}`
      }
      try{
        const result = await getUserBlogsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserBlogs(result.data)
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
    getUserBlogs()
  }else{
    console.log(result);
  }
    }
  }
  
  

  return (
    <>
    <div className='container text-center mt-5'><Add/></div>
          <div className='container mt-5'>
            <h1 className='text-info'><span className='text-dark'>My</span> Blogs</h1>
            {
        userBlogs?.length>0 ?
        userBlogs?.map(blog=>(


<Card className='shadow-lg btn rounded mt-4' style={{ width: '100%'}}>
<CardBody>
<div className='row'>
 <div className='col-lg-6'>
   <CardImg style={{width:"100%", height:"50vh", border:"none"}} variant="top" src={`${SERVER_URL}/uploads/${blog?.blogImage}`} alt={blog?.title}>

   </CardImg>
 

 </div>
 <div className='col-lg-6 mt-4'>
 <CardTitle>
   <h3 className='fw-bolder'>{blog?.title}</h3>

 </CardTitle>
<div className='mt-5'>
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
    <div><Edit blog={blog}/></div>
<button onClick={()=>handleDeleteBlog(blog?._id)} className='btn btn-info rounded ms-4 fw-bolder'><i className='fa-solid fa-trash text-light me-2'></i>Delete</button>
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

{/* <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <img className='img-fluid' style={{width:'100%', height:"50vh"}}/>

            </div>
            <div className='col-lg-6'>
              <div className='row mt-5'>
                <div className='col-lg-6'>
<h6>@AUTHER</h6>
                </div>
                <div className='col-lg-6'>
<h6><i className="fa-solid fa-calendar-days"></i>DATE</h6>
                </div>
              </div>
              <h6 className='mt-4'>#SPORTS</h6>

            </div>
            <div>
            <p style={{textAlign:'justify'}}></p>

            </div>

          </div>


        </Modal.Body>
      </Modal> */}


    </>
  )
}

export default View