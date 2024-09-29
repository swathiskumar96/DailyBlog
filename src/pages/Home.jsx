import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import cover from '../assets/hero4.png'
import { Card, CardBody, CardImg, CardTitle} from 'react-bootstrap'
import Add from '../components/Add'
import BlogCard from '../components/BlogCard'
import Edit from '../components/Edit'
import { getAllBlogsAPI } from '../services/allAPI'


function Home() {
  // const [createdDate, setCreatedDate] = useState(null);

  // useEffect(() => {
  //   const now = new Date(); 
  //   setCreatedDate(now.toLocaleString()); 
  // }, []);
 
 
 
  const [searchKey,setSearchKey] = useState("")
  const [allBlogs,setAllBlogs] = useState([])
  console.log(allBlogs);
 

  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

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





  return (
    <>
    <Header/>

<div style={{ minHeight: '100vh' }} className='w-100 d-flex justify-content-center align-items-center shadow rounded bg-info'>
        <div className='container rounded'>
          <div className='row align-items-center'>
            <div className='col-lg-5'>
              {/* <h1 style={{ fontSize: '50px' }}><i className="fa-brands fa-blogger text-danger me-2"></i><b>Daily Blog</b></h1> */}
              <h1 className='fw-bolder text-white'>Insights and stories from around the world.</h1>
              {
                loginStatus ?
      
                  <Link to={'/dashboard'} style={{border:"darkorange 1px solid"}} className='btn btn-light rounded fw-bolder mt-5 text-info '>Upload & Manage Your Blog<i className="fa-solid fa-long-right-arrow"></i> </Link>
                  :
                  <Link to={'/login'} style={{border:"darkorange 1px solid"}} className='btn btn-light rounded fw-bolder mt-5 text-info'>Create Blog<i className="fa-solid fa-long-right-arrow"></i> </Link>
                }
     
            </div>

            <div className='col-lg-7'>
              <img style={{ width: '100%',height:"100vh" }} className='img-fluid' src={cover} alt="" />
            </div>

          </div>

        </div>
      </div>


<div className='shadow mt-5 bg-light'>
  <div className='container d-flex justify-content-between'>
    <h1 className='fw-bolder text-info my-5'><i className="fa-brands fa-blogger text-info me-2"></i>Latest</h1>
    <input onChange={e=>setSearchKey(e.target.value)} style={{borderRadius:"50px",height:"45px"}} className='form-control w-25 my-5' type="text" placeholder='Search blog by "genre" used'/>
 </div>
<div className='mb-5'>
{
          allBlogs?.length>0?
          allBlogs?.map(blog=>(

   <BlogCard displayData={blog}/>
   ))
   :
   <div className='fw-bolder text-danger m-5 text-center'>Blog not found</div>
}

  
</div>
 </div>
 </>
  )
}

export default Home