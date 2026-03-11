import React from 'react'
import Home from './Pages/Home'
import {Routes , Route } from 'react-router'
import FindHospital from './Components/HospitalSystem/FindHospital'

const App = () => {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Hospital" element={<FindHospital />} />
    </Routes>
    
    </>
  )
}

export default App
