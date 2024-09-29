import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div style={{height:'300px',backgroundColor:""}} className='mt-5 w-100 shadow-lg bg-light'>
<div className="footer-content d-flex justify-content-between container">
    <div style={{width:'400px',color:"black"}} className="media mt-5">
        <h5 className='fw-bolder'><i className="fa-brands fa-blogger text-info me-2"></i><b>Daily Blog</b></h5>
        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        <span>Code Licensed MIT, docs CC BY 3.0.</span><br/>
        <span>Currently V5.3.2.</span>
    </div>
    <div className="links d-flex flex-column mt-5">
        <h5 className='d-flex fw-bolder'>Links</h5>
        <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Home</Link>
        <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login</Link>
        <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>Register</Link>

    </div>
    <div className="guides d-flex flex-column mt-5">
        <h5><b>Guides</b></h5>
        <a href="https://react.dev/" target='_blank' style={{textDecoration:'none',color:'black'}}>React JS</a>
        <a href="https://reactrouter.com/en/main" target='_blank' style={{textDecoration:'none',color:'black'}}>React Routing</a>
        <a href="https://react-bootstrap.github.io/" target='_blank' style={{textDecoration:'none',color:'black'}}>React Bootstrap</a>

    </div>
    <div className="contact mt-5">
        <h5><b>Contact Us</b></h5>
        <div className="d-flex">
            <input type="text" className="form-control me-2" placeholder='Email Id Please' />
            <button className='btn btn-info'><i className="fa-solid fa-arrow-right"></i></button>
        </div>
        <div className="icons d-flex justify-content-between mt-3">
        <a href="https://twitter.com/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://instagram.com/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-brands fa-instagram"></i></a>
        <a href="https://facebook.com/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-brands fa-facebook"></i></a>
        <a href="https://linkedin.com/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-brands fa-github"></i></a>
        <a href="https://react.dev/" target='_blank' style={{textDecoration:'none',color:'black'}}><i class="fa-solid fa-phone"></i></a>


        </div>
    </div>

    </div> 
    <p className='text-center mt-3'>Copyright &copy; 2024 Daily Blog. Built with MERN.</p>    
       </div>

    </>
  )
}

export default Footer