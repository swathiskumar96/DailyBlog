import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Users from './pages/Users'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/TokenAuth'
import BlogPage from './pages/BlogPage'



function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)


  return (
    <>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth insideRegister/>}></Route>
        <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/admin' element={isAuthorised?<Admin/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/users' element={isAuthorised?<Users/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/blogpage' element={isAuthorised?<BlogPage/>:<Navigate to={'/login'}/>}></Route>
               <Route path='/*' element={<Navigate to={'/'}/>}></Route>

    </Routes>
    <Footer/>

    </>
  )
}

export default App
