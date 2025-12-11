import React from 'react'
import "./Home.css";
import Hero from '../../components/hero/Hero';
import Popular from '../../components/popular/Popular';
export default function Home() {
  return (
    <div className='home'>
      <Hero/>
      <Popular/>
    </div>
  )
}
