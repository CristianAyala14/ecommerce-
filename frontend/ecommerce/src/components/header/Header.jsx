import React from 'react'
import "./Header.css"
import logo from "../../assets/logo.png"
import Navbar from "../navbar/Navbar"
export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt=""/>
      <button className='open-menu'>Abrir</button>
      <Navbar/>
      <div>nada</div>
    </header>
  )
}
