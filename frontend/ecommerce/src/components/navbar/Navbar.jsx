import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar() {
  return (
    <div className='nav'>
      <button className='close-menu'>Cerrar</button>
      <ul className='nav-list'>
        <li><Link className='nav-options'>Productos</Link></li>
        <li><Link className='nav-options'>About</Link></li>
        <li><Link className='nav-options'>Otra cosa</Link></li>
        <li><Link className='nav-options'>23a</Link></li>
      </ul>
    </div>
  );
}
