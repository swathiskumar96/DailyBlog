import React, { useContext, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/login2.png'
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/TokenAuth';


function Auth({ insideRegister }) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate = useNavigate()
  const [userInputs,setUserInputs] = useState({
    username:"", email:"", password:""
  })
  console.log(userInputs);

  const handleRegister = async (e) =>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password ){
// api call
try{
const result = await registerAPI(userInputs)
console.log(result);
if(result.status==200){
  toast.success(`welcome ${result.data.username}...Please login to explore our website`)
  setUserInputs({username:"",email:"",password:""})
setTimeout(()=>{
  navigate('/login')
},2000)
}else{
  toast.error(result.response.data)
  setTimeout(()=>{
    setUserInputs({username:"",email:"",password:""})

  },2000)
}
}catch(err){
  console.log(err);
}

    }else{
      toast.warning("Please fill the form completely")
    }
  }



  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
//api call
try{
  const result = await loginAPI(userInputs)
  if(result.status==200){
    sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
    sessionStorage.setItem("token",result.data.token)
    setIsAuthorised(true)
    toast.success(`welcome ${result.data.existingUser.username}...`)
    setUserInputs({username:"",email:"",password:""})
    setTimeout(()=>{
      if(result.data.existingUser.admin) {
        navigate('/admin');
    } else {
      navigate('/')
    }
    },2000)
  }else{
    toast.error(result.response.data)
  }
}
catch(err){
  console.log(err);
}
 }else{
  toast.warning("Please fill the form completely")
 }}


  return (
    <>
          <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center mt-3 '>
        <div className='container'>
          <Link to={'/'} style={{ textDecoration: 'none' }} className='fe-bolder'><i className='fa-solid fa-arrow-left text-info'> Home</i></Link>
          <div className='card shadow p-3 rounded bg-light'>
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <img style={{height:"85vh"}} className='w-100' src={login} alt="Auth" />

              </div>
              <div className='col-lg-6'>
                <h1 className='fw-bolder mt-2'><i className='fa-brands fa-blogger me-2 text-info'></i>
                  Daily Blog</h1>
                <h5 className='fw-bolder mt-2'>
                  <span className='text-info'>S</span>ign {insideRegister ? 'up' : 'in'} to your Account
                </h5>
                <Form className='mt-5'>
                {
                    insideRegister &&

                  
                  <FloatingLabel
                    controlId="floatingInputName"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.username} onChange={e=>setUserInputs({...userInputs,username:e.target.value})} className='rounded' type="text" placeholder="Username" />
                  </FloatingLabel>
                }

<FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email} onChange={e=>setUserInputs({...userInputs,email:e.target.value})} className='rounded'  type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userInputs.password} onChange={e=>setUserInputs({...userInputs,password:e.target.value})} className='rounded'  type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
              
      
                  <div className='mt-4'>
                    <button onClick={handleRegister}  className='btn btn-info mb-2 rounded fw-bolder'>Register</button>
                    <p>Allready have an Account? Click here to <Link className='text-info fw-bolder' to={'/login'}>Login</Link></p>
                  </div>
                  
                   :
                   <div className='mt-4'>
                                        <button onClick={handleLogin} className='btn btn-info mb-2 rounded fw-bolder'>Login</button>
                                        <p>New User? Click here to <Link className='text-info fw-bolder' to={'/register'}>Register</Link></p>


                   </div>
                  }
                  </Form>
                



              </div>

            </div>
          </div>

        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

      </div>


    
    </>
  )
}

export default Auth