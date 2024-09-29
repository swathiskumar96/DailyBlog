import React, { useState, useEffect } from 'react';
// import { Collapse } from 'react-bootstrap'
import View from '../components/View';
import { SERVER_URL } from '../services/serverUrl';
import profileImg from '../assets/profileImg.jpeg'
import { Collapse } from 'react-bootstrap';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",profileImage:""
  })

  const [open, setOpen] = useState(false);

  const [displayName,setDisplayName] = useState("")
  
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const {username} = JSON.parse(sessionStorage.getItem("existingUser"))
      setDisplayName(username)
    }else{
      setDisplayName('')
    }
  },[open])

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
     const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
     setUserDetails({
       ...userDetails, username:existingUserDetails.username, email:existingUserDetails.email,password:existingUserDetails.password
     })
     setExistingImg(existingUserDetails.profile)
    }
 },[])

 useEffect(()=>{
   if(userDetails.profileImage){
     setPreview(URL.createObjectURL(userDetails.profileImage))
   }else{
     setPreview("")
   }
 },[userDetails.profileImage])


 const handleUserProfile = async()=>{
  const {username,email,password,profileImage}=userDetails
  if(!profileImage){
    toast.warning("please fill the form completely")
  }else{
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
    
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type" : preview?"multipart/form-data":"application/json",
        "Authorization" : `Bearer ${token}`
      }
      //api call
      try{
        const result = await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
          console.log(result);
        }

      }catch(err){
        console.log(err);
      }
    }
  }
}






  return (
<>
<Header insideDashBoard={true}/>
<div style={{marginTop:'100px'}} className='container-fluid'>
  <div className='container d-flex align-items-center justify-content-between'>
  <h1>Welcome <span className='text-info me-2'>{displayName?.split(" ")[0]}</span>,</h1>
  <label className='text-center d-flex'> 
     <input onChange={e=>setUserDetails({...userDetails,profileImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
     {
      existingImg == "" ?

     <img width={'70px'} height={'70px'} className='rounded-circle ms-5' src={preview?preview:profileImg} alt="" />
     :
     <img width={'70px'} height={'70px'} className='rounded-circle ms-5' src={`${SERVER_URL}/uploads/${existingImg}`} alt="" />
     }
           <button onClick={() => setOpen(!open)} className='btn text-warning fw-bolder'><i className='fa-solid fa-chevron-right'></i></button>
           <Collapse in={open}>
           <div className='justify-content-center align-items-center p-3 shadow' id="example-collapse-text" >

<div className=''>
            <button onClick={handleUserProfile} className='btn btn-info fw-bolder rounded'>Update Profile</button>
  
</div>          
</div>
    </Collapse>


     </label>

  {/* <button onClick={() => setOpen(!open)} className='btn text-warning fw-bolder'><i className='fa-solid fa-chevron-down'></i></button>

  </div>
  <Collapse in={open}>
    <div className='row justify-content-center mt-3 shadow' id="example-collapse-text" >
     <label className='text-center'> 
     <input type="file" style={{display:'none'}}/>
     <img width={'200px'} height={'200px'} className='rounded-circle'src={cover} alt="" /></label>
     </div>
    </Collapse> */}
  </div>


</div>
<View/>
<ToastContainer position='top-center' theme='colored' autoClose={3000} />

</>





  );
}

export default Dashboard;
