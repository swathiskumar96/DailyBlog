import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SERVER_URL } from '../services/serverUrl';



function BlogPage() {


  
  return (
    <>
    <div className='container mt-5'>


            <h1>Title</h1>
            <img style={{width:"100%",height:"50vh",border:"none"}} variant="top" src={`${SERVER_URL}/uploads/${displayData?.blogImage}`} alt={blog.title}/>
            <div className='d-flex justify-content-between'>
                <p className='fw-bolder'>@ Author</p>
                <p className='fw-bolder'><i className="fa-solid fa-calendar-days"></i> date</p>
            </div>
            <p className='fw-bolder'># Genre</p>
    
            <div className='mt-4'>
                <textarea style={{textAlign:'justify'}}  className="form-control mt-4" rows="50" placeholder="Overview" readOnly>Overview</textarea>

</div>    
           

            </div>   
    </>
  )
}

export default BlogPage