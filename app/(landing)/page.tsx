import React from 'react'
import { Header } from './layout'
import Hero from './components/Hero'
import { About } from './components/About'
import { Features } from './components/Features'
import { FAQ } from './components/Faq'
import {Footer} from './components/Footer'
import Pricing from './components/Pricing'

function page() {
  return (
    <div>
        <Header/>
        <Hero/>
        <About/>
        <Features/>
        <Pricing/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default page