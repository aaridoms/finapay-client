import { useState ,useContext } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Error from './pages/Error'
import Navbar from './components/Navbar'
import NavbarUser from './components/NavbarUser'
import { AuthContext } from "./context/auth.context";
import Summary from './pages/Summary'
import Profile from './pages/Profile'

function App() {

  const {isUserActive} = useContext(AuthContext)

  return (
    <>
{isUserActive ===true ?<NavbarUser /> :<Navbar /> }

  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account/summary" element={<Summary />} />
      <Route path="/account/profile" element={<Profile />} />



      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />

    </Routes>

    </>
  )
}

export default App
