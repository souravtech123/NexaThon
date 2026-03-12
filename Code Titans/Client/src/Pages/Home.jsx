import React from 'react'
import Hero from '../Components/Home/Hero'
import NearbyHospitals from '../Components/Home/Hospital'

import BloodDonorSection from '../Components/Home/BloodDonor'
import EmergencyContactSection from '../Components/Home/EmegencySection'
import HospitalResourceSection from '../Components/Home/HospitalResourceSection'
import Navbar from '../Components/Home/Navbar'
import Footer from '../Components/Home/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <NearbyHospitals />
    <BloodDonorSection/>
    <EmergencyContactSection/>
    <HospitalResourceSection/>
    <Footer/>
    
    </>
  )
}

export default Home
