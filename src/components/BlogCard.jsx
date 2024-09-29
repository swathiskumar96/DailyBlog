import React, { useEffect, useState } from 'react'
import cover from '../assets/hero3.png'
import {Button, Card, CardBody, CardImg, CardTitle, Form, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';




function BlogCard({displayData}) {
   
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Register the size module with Quill
useEffect(() => {
  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = ['normal', 'large', 'huge'];
  ReactQuill.Quill.register(Font, true);
}, []);

 
  return (
    <>
      <div className='container mt-4'>
      {/* <Link to={'/blogpage'}> */}

      <Card onClick={handleShow} className='shadow-lg btn rounded' style={{ width: '100%'}}>
           <CardBody>
          <div className='row'>
            <div className='col-lg-6'>
              <CardImg style={{width:"100%", height:"50vh", border:"none"}} variant="top" src={`${SERVER_URL}/uploads/${displayData?.blogImage}`} alt={displayData?.title}>
  
              </CardImg>
            
      
            </div>
            <div className='col-lg-6 mt-4'>
            <CardTitle>
              <h2 className='fw-bolder'>{displayData?.title}</h2>
  
            </CardTitle>
  <div className='mt-5'>
    <div className='row'>
      <div className='col-lg-6'>
        <p className='fw-bolder'>@ {displayData?.author}</p>
        <p className='fw-bolder'># {displayData?.genre}</p>
  
      </div>
      <div className='col-lg-6'>
        <p className='fw-bolder'><i className="fa-solid fa-calendar-days"></i> {displayData?.date}</p>
  
      </div>
  
    </div>
  </div>
      
            </div>
      
          </div>
    
  </CardBody>  
      </Card>
  
{/* </Link>   */}
  </div>

  <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder fs-1'>{displayData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-9'>
              <img className='img-fluid' style={{width:'100%', height:"60vh"}} src={`${SERVER_URL}/uploads/${displayData?.blogImage}`} alt={displayData?.title}/>

            </div>
            <div className='col-lg-3'>
              <div className='row mt-5'>
                <div className='col-lg-6'>
<h6 className='fw-bolder'>@ {displayData?.author}</h6>
                </div>
                <div className='col-lg-6'>
<h6 className='fw-bolder'><i className="fa-solid fa-calendar-days"></i> {displayData?.date}</h6>
                </div>
              </div>
              <h6 className='mt-4 fw-bolder'># {displayData?.genre}</h6>

            </div>
            <div className='mt-4'>
            {/* <textarea style={{textAlign:'justify'}}  className="form-control mt-4" rows="50" placeholder="Overview" readOnly>{displayData?.overview}</textarea> */}
            <ReactQuill
        theme="snow"
        value={displayData?.overview}
        // onChange={handleOverviewChange}
        placeholder="Overview"
        readOnly
        modules={{ toolbar: false }} // Hide the toolbar
        className="custom-quill" // Apply the custom class

      />

            </div>

          </div>

        </Modal.Body>
      </Modal>

    </>
  )
}

export default BlogCard