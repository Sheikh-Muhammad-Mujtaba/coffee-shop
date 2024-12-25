import About from '@/components/About'
import DeliveryService from '@/components/DeliverySer'
import HeroSection from '@/components/Hero/HeroSection'
import Popular from '@/components/Hero/popular'
import Menu from '@/components/Menu'
import React from 'react'

function page() {
  return (
    <div className='flrx items-center justify-center'>
      <HeroSection />
      <Popular />
      <DeliveryService />
      <About />
      <Menu />
    </div>
  )
}

export default page