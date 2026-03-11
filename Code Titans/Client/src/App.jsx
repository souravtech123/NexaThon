import React from 'react'
import Home from './Pages/Home'
import {Routes , Route } from 'react-router'
import FindHospital from './Components/HospitalSystem/FindHospital'
import BloodDonorApp from './Pages/BloodDonor'

const App = () => {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Hospital" element={<FindHospital />} />
      <Route path="/Donor" element={<BloodDonorApp />} />
      
    </Routes>
    
    </>
  )
}

export default App
