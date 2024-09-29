import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';
import { editBlogAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



function Edit({blog}) {

  const {editResponse,setEditResponse} = useContext(editResponseContext)

    console.log(blog);
    const [blogData,setBlogData] = useState({
      id:blog?._id,title:blog?.title,author:blog?.author,genre:blog?.genre,date:blog?.date,overview:blog?.overview,blogImage:""
    })
    const [preview,setPreview] = useState("")
    const [show, setShow] = useState(false);

    const handleOverviewChange = (value) => {
      setBlogData({ ...blogData, overview: value });
    };

  


        // Register the size module with Quill
useEffect(() => {
  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = ['normal', 'large', 'huge'];
  ReactQuill.Quill.register(Font, true);
}, []);




  
    useEffect(()=>{
      if(blogData.blogImage){
        setPreview(URL.createObjectURL(blogData.blogImage))
      }else{
        setPreview("")
      }
    },[blogData.blogImage])
  
    const handleClose = () =>{
      setShow(false);
    setBlogData({id:blog?._id,title:blog?.title,author:blog?.author,genre:blog?.genre,date:blog?.date,overview:blog?.overview,blogImage:""})
 setPreview("")
   }
   const handleShow = () => {
     setShow(true);
     setBlogData({id:blog?._id,title:blog?.title,author:blog?.author,genre:blog?.genre,date:blog?.date,overview:blog?.overview,blogImage:""})    
    
     const currentDate = new Date().toISOString().slice(0, 16);
     setBlogData((prevData) => ({
       ...prevData,
       date: currentDate
     }));
 
    }

 
   const handleUpdataBlog = async ()=>{
    const {title,author,genre,date,overview,blogImage}= blogData
    if(!title||!author||!genre||!date||!overview){
      toast.warning("Please fill the form completely")

    }else{
      //procced api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("author",author)
      reqBody.append("genre",genre)
      reqBody.append("date",date)
      reqBody.append("overview",overview)
      preview?reqBody.append("blogImage",blogImage):reqBody.append("blogImage",blog.blogImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : preview?"multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        //API CALL
        try{
          const result = await editBlogAPI(blogData.id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            //pass response view
            setEditResponse(result)
          }else{
            console.log(result.response);
          }
        }catch(err){
          console.log(err);
        }

    }
  }
}

  
  return (
    <>
        <button onClick={handleShow} className='btn btn-info rounded fw-bolder text-light fw-bolder'><i className='fa-solid fa-edit me-2'></i>Edit</button>
<Modal
        size='xl'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>Edit Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <label>
                <input onChange={e=>setBlogData({...blogData,blogImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
                <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${blog?.blogImage}`}alt="blog?.title"  />

              </label>
              
              <div className='text-danger mb-4 mt-2'>*Upload only following file types (jpg , jpeg , png) here!!</div>
              
            </div>
            <div className='col-lg-6'>
              <div className='mb-2'>
                {/* <input type="text" className='form-control' placeholder='Title'/> */}
                <textarea value={blogData.title} onChange={e=>setBlogData({...blogData,title:e.target.value})} className="form-control" rows="5" placeholder="Title"></textarea>


              </div>
              <div className='mb-2'>
                <input value={blogData.author} onChange={e=>setBlogData({...blogData,author:e.target.value})} type="text" className='form-control' placeholder='Auther'  />

              </div>
              <div className='mb-2'>
                <input value={blogData.genre} onChange={e=>setBlogData({...blogData,genre:e.target.value})} type="text" className='form-control' placeholder='Genre' />

              </div>
              <div className='mb-2'>
                {/* <input value={blogData.date} onChange={e=>setBlogData({...blogData,date:e.target.value})} type="date" className='form-control' placeholder='Date' /> */}
                <input value={blogData.date} readOnly type="datetime-local" className='form-control' placeholder='Date' />
              </div>



            </div>

          </div>
          <div className=''>
                {/* <input type="text" className='form-control' placeholder='Overview' /> */}
                {/* <textarea value={blogData.overview} onChange={e=>setBlogData({...blogData,overview:e.target.value})} className="form-control" rows="50" placeholder="Overview"></textarea> */}
                <ReactQuill
        theme="snow"
        value={blogData.overview}
        onChange={handleOverviewChange}
        placeholder="Overview"
        className="custom-quill" // Apply the custom class

      />


              </div>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary rounded fw-bolder" >
            Cancel
          </Button>
          <Button onClick={handleUpdataBlog} variant="danger rounded fw-bolder">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Edit