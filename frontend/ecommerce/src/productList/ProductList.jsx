import React from 'react'
import "./ProductList.css"
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Item from '../components/item/Item'
import { all_products } from "../assets/productListProductsMockUp"
import banner from "../assets/nuevosIngresos1.jpeg"



export default function ProductList({ category }) {

  let productsToRender = [];

  // 1️⃣ Si NO vino categoría → mostrar todos
  if (category === null) {
    //version backednd seria llamar a allproducts
    productsToRender = all_products;
  } 
  // 2️⃣ Si vino categoría → filtrar
  else {
    //version backednd seria llamar a allproducts con filtro de la categoria

    productsToRender = all_products.filter(
      item => item.category === category
    );
  }

  return (
    <section className='productList-container'>
    
      {/* banner */}
      <div className='title-banner-category' style={{backgroundImage: `url(${banner})`}}>
        <div>
          <p className='productList-title' >{category ? category : "Nuestros productos"}</p>
        </div>
        
      </div>
      
      <div className='productList-info-filters'>
        
        Mostranado {productsToRender.length} de  {all_products.length}products
        
        <div className='productList-filter'>
          Sort by
          <MdOutlineKeyboardArrowDown size={"0.6em"}/>
        </div> 

      </div>
        
      {/* Products container */}
      <div className='productList-products-container'>
        {productsToRender.map(item => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
        
      <div className='productLists-showmore'>
        <button><MdOutlineKeyboardArrowDown size={"1.2em"}/></button>
      </div>
        
    </section>
  )
}
