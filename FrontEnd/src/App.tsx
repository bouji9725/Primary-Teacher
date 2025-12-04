//import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './Pages/about'
import Packages from './Pages/Packages'
import Services from './Pages/Services'
import HomePage from './Pages/HomePage'
import Booking from './Pages/Booking'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/Services" element={<Services />} />
      <Route path="/Packages" element={<Packages />} />
      <Route path="/Booking" element={<Booking />} />

    </Routes>

    </BrowserRouter>
  )
}

export default App
