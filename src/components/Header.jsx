import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'



function Header({insideDashBoard}) {
  const {isAuthorised,setIsAuthorised} =useContext(tokenAuthContext)
  const navigate = useNavigate()
  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <>
    <Navbar style={{zIndex:'1' }} className='card shadow-lg top-0 position-fixed w-100 bg-info'>
      <Container>
        <Navbar.Brand>
          <Link style={{textDecoration:'none'}} className='fw-bolder text-white' to={'/'}><i className="fa-brands fa-blogger text-white"></i> <b>Daily Blog</b></Link>
        </Navbar.Brand>
       
       <div className="ms-auto d-flex ">
          <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }} className='me-4 mt-2 fw-bolder'><span className='text-white'>L</span>ogin</Link>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'white' }} className='mt-2 fw-bolder'><span className='text-white'>R</span>egister</Link>
          {insideDashBoard &&

       <button onClick={logout} className='btn btn-link text-white fw-bolder ms-4 '><span className='text-white'>L</span>ogout <i className='fa-solid fa-arrow-right text-white'></i></button>
          }
       </div>

    
      </Container>
    </Navbar>    
    </>
  )
}

export default Header