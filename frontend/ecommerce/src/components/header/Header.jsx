import React from 'react'
import { useState } from 'react'
import "./Header.css"
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { MdMenu, MdShop2, MdContacts, MdInfo, MdAccountCircle, MdClose , MdShoppingCart, MdLogout, MdPerson } from "react-icons/md";

export default function Header() {

  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const categorias = ["Tecnología", "Moda", "Comida", "Perros", "Bazar"];
  const navigate = useNavigate();

  const handleCategoryClick = (categoria) => {
    navigate(`/products?category=${encodeURIComponent(categoria)}`);
    setDropdownOpen(false);
    setOpen(false); // opcional: cierra menú mobile
  };

  return (
    <header className="header">
      <Link to={"/"}><img className="logo" src={logo} alt=""/></Link>
      
      {!open && (
        <button className='open-menu' onClick={() => setOpen(true)}><MdMenu size="0.8em"/></button>
      )}
      
      <div className={`nav ${open ? "visible" : ""}`}>
        <ul className='nav-list'>
  
          <li 
            className='nav-options-wrapper'
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <NavLink className='nav-options' to={"/products"}><MdShop2 size="0.4em"/>Productos</NavLink> 
            {dropdownOpen && (
              <div className='header-dropdown'>
                {categorias.map((cat, idx) => (
                  <div key={idx} className="dropdown-item" onClick={() => handleCategoryClick(cat)}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </li>
          

          <li><NavLink className='nav-options' to={"/about"}><MdInfo size="0.4em"/>Sobre nosotros</NavLink></li>
          <li><NavLink className='nav-options' to={"/contact"}><MdContacts size="0.4em"/>Contactanos</NavLink></li>
        </ul>
        <button className='close-menu' onClick={() => setOpen(false)}><MdClose size="0.6em"/></button>
      </div>

      

      {logged ? (
        <div className='cart-user'>
          <div className='cart-icon-wrapper'>
            <NavLink className='cart-user-icons' to={"/cart"}>
              <MdShoppingCart size="0.8em" />
            </NavLink>
            <span className='cart-count'>3</span>
          </div>
          <div>
            <NavLink className='cart-user-icons' to={"/profile"}>
              <MdAccountCircle size="0.8em"/>
            </NavLink>
          </div>
          
          <button className="logout-button">
            <MdLogout size="0.8em" />
          </button>
        </div>
      ) : (
        <div className='login-button-container'>
          <MdPerson size="0.5em" />
          <NavLink to={"/login"}>Login</NavLink>
        </div>
      )}
    </header>
  )
}
