import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Error from './pages/Error'
import Navbar from './components/Navbar'
import NavbarUser from './components/NavbarUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className="text-3xl font-bold underline">FINAPAY</h1>

    {/* <Navbar /> */}
    <NavbarUser />
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    </>
  )
}

export default App
