import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import blogImg from '../assets/upload.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBlogAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



function Add() {


  const {addResponse,setAddResponse} = useContext(addResponseContext)

  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus]= useState()

  const [blogDetails,setBlogDetails]= useState({
    title:"",author:"",genre:"",date:"",overview:"",blogImage:""
      })
      console.log(blogDetails);
    
    const [show, setShow] = useState(false);

    const handleOverviewChange = (value) => {
      setBlogDetails({ ...blogDetails, overview: value });
    };
  


    const handleClose = () => {
      setShow(false);
      setBlogDetails({title:"",author:"",genre:"",date:"",overview:"",blogImage:""})
      }
    
  // const handleShow = () => setShow(true);
  const handleShow = () => {
    setShow(true);
    const currentDate = new Date().toISOString().slice(0, 16);
    setBlogDetails(prevDetails => ({ ...prevDetails, date: currentDate }));
  };




// Register the size module with Quill
useEffect(() => {
  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = ['normal', 'large', 'huge'];
  ReactQuill.Quill.register(Font, true);
}, []);


    useEffect(()=>{
      if(blogDetails.blogImage.type=="image/jpg" || blogDetails.blogImage.type=="image/jpeg" || blogDetails.blogImage.type=="image/png" ){
        setImageFileStatus(true)
        setPreview(URL.createObjectURL(blogDetails.blogImage))
      }else{
        setPreview(blogImg)
        setImageFileStatus(false)
        setBlogDetails({...blogDetails,blogImage:""})
      }
    },[blogDetails.blogImage])

    const handleUploadBlog= async()=>{
      const {title,author,genre,date,overview,blogImage} = blogDetails
      if(!title || !author || !genre || !date || !overview || !blogImage){
        toast.warning("Please fill the form completely")
      }else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("author",author)
        reqBody.append("genre",genre)
        reqBody.append("date",date)
        reqBody.append("overview",overview)
        reqBody.append("blogImage",blogImage)
  
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${token}`
          }
          //api call
          try{
          const result = await addBlogAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            setAddResponse(result)
            handleClose()
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
  console.log(err);
        }
  
        }
  
      }
    }
  
  


  return (
    <>
    <button style={{border:"darkorange 1px solid",height:"50px",fontSize:"20px"}} onClick={handleShow} className='btn btn-info rounded fw-bolder'><i className='fa-solid fa-plus me-1'></i>Upload Your Blog</button>
<Modal
        size='xl'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>New Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setBlogDetails({...blogDetails,blogImage:e.target.files[0]})}/>
                <img height={'200px'} width={'100%'} className='img-fluid' src={preview} alt="" />

              </label>
              {!imageFileStatus&&
     
              <div className='text-danger mb-4'>*Upload only following file types (jpg , jpeg , png) here!!</div>
}
            </div>
            <div className='col-lg-6'>
              <div className='mb-2'>
                {/* <input type="text" className='form-control' placeholder='Title'/> */}
                <textarea className="form-control" rows="5" placeholder="Title" value={blogDetails.title} onChange={(e)=>setBlogDetails({...blogDetails,title:e.target.value})}></textarea>


              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Author' value={blogDetails.author} onChange={(e)=>setBlogDetails({...blogDetails,author:e.target.value})} />

              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Genre' value={blogDetails.genre} onChange={(e)=>setBlogDetails({...blogDetails,genre:e.target.value})}/>

              </div>
              <div className='mb-2'>
                {/* <input type="date" className='form-control' placeholder='Date' value={blogDetails.date} onChange={(e)=>setBlogDetails({...blogDetails,date:e.target.value})}/> */}
                <input type="datetime-local" className='form-control' value={blogDetails.date} readOnly />
              </div>



            </div>

          </div>
          <div className=''>
                {/* <input type="text" className='form-control' placeholder='Overview' /> */}
                {/* <textarea className="form-control" rows="50" placeholder="Overview" value={blogDetails.overview} onChange={(e)=>setBlogDetails({...blogDetails,overview:e.target.value})}></textarea> */}
                <ReactQuill
        theme="snow"
        value={blogDetails.overview}
        onChange={handleOverviewChange}
        placeholder="Overview"
        className="custom-quill" // Apply the custom class
      />

              </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary rounded fw-bolder"onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger rounded fw-bolder"onClick={handleUploadBlog}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Add