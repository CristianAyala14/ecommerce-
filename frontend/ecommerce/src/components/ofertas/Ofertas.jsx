import React, { useRef } from 'react'
import "./Ofertas.css"
import Item from '../item/Item'
import { OFERTAS } from '../../assets/ofertasProductsMockUp'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Ofertas() {

  const trackRef = useRef(null);

  const scrollLeft = () => {
    trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    
    <section className='ofertas-container'>

        <h3 className='ofertas-title'>Ofertas</h3>
        <p className='ofertas-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe qui perferendis assumenda sequi aut eum autem, libero numquam quam vero doloremque nisi aliquid veniam, rem ipsum corporis, velit tenetur a.</p>

        <div className="carousel">

          <button className="arrow left" onClick={scrollLeft}>
            <MdChevronLeft />
          </button>

          <div className="carousel-window">
            <div className="carousel-track" ref={trackRef}>
              {OFERTAS.map(item =>
                <Item 
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              )}
            </div>
          </div>

          <button className="arrow right" onClick={scrollRight}>
            <MdChevronRight />
          </button>

        </div>

    </section>
    
  )
}
