import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardImg, CardTitle, Modal } from 'react-bootstrap'
import { deleteUserAPI, getAllUsersAPI } from '../services/allAPI';
import Header from '../components/Header';

function Users() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        getAllUsers()
      },[])

      const getAllUsers = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await getAllUsersAPI(reqHeader);
          if (result.status === 200) {
            setAllUsers(result.data);
          }
        } catch (err) {
          console.log(err);
        }
      };

      const handleDeleteUser = async (userId) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        try {
            const result = await deleteUserAPI(userId, reqHeader);
            if (result.status == 200) {
                getAllUsers();
            } else {
            }
        } catch (err) {
            console.log(err);
        }
      };
      
    
    
    
  return (
    <>
    <Header insideDashBoard={true}/>

    <div style={{marginTop:'100px'}} className='container'>
        <h1 className='fw-bolder text-center my-5'>Manage <span className='text-info' > All Users</span></h1>
        {allUsers?.length > 0 ? (
          allUsers.map(user => (
            <Card style={{width:"100%"}} className='shadow-lg btn rounded mt-1' key={user._id}>
              <CardBody className='d-flex justify-content-between'>
                      <h5 className='fw-bolder'>{user.username}</h5>
                      <p className='fw-bolder'>{user.email}</p>
  
                      <button onClick={() => handleDeleteUser(user._id)} className='btn btn-info rounded fw-bolder'>
                                                      <i className='fa-solid fa-trash text-light me-2'></i>Delete
                                                  </button>
  
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="fw-bolder text-warning">No Users Found</div>
        )}
      </div>


    </>
  )
}

export default Users