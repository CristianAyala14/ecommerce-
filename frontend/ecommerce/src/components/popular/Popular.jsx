import React, { useRef } from 'react'
import "./Popular.css"
import Item from '../item/Item'
import { POPULAR } from '../../assets/popularProductsMockUp'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Popular() {

  const trackRef = useRef(null);

  const scrollLeft = () => {
    trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    
    <section className='popular-container'>

        <h3 className='popular-title'>Popular Products</h3>
        <p className='popular-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe qui perferendis assumenda sequi aut eum autem, libero numquam quam vero doloremque nisi aliquid veniam, rem ipsum corporis, velit tenetur a.</p>

        <div className="carousel">

          <button className="arrow left" onClick={scrollLeft}>
            <MdChevronLeft />
          </button>

          <div className="carousel-window">
            <div className="carousel-track" ref={trackRef}>
              {POPULAR.map(item =>
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
