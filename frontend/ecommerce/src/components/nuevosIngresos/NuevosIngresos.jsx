import React from 'react'
import { useState, useEffect } from 'react'
import "./NuevosIngresos.css"
import { NUEVOS_INGRESOS } from '../../assets/nuevosIngresosProductsMockUp'
import Item from '../item/Item'

export default function NuevosIngresos() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % NUEVOS_INGRESOS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const productoActual = NUEVOS_INGRESOS[index];


    return (
      <section className='nuevos-ingresos-container'>
        <div  className='nuevos-ingresos'style={{backgroundImage: `url(${productoActual.image})`}}>
					<p className='nuevos-ingresos-title'>NUEVOS INGRESOS</p>
					<div className="producto-card-wrapper">
						<Item 
							id={productoActual.id}
							image={productoActual.image}
							name={productoActual.name}
							new_price={productoActual.new_price}
							old_price={productoActual.old_price}
          	/>
        	</div>
				</div>
				
        

    </section>

  )
}
