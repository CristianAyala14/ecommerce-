import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterProducts from '../../components/filterProducts/FilterProducts';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || "Todos los productos";

  return (
    <div>
      <h2 style={{margin: "1rem 0"}}>Categoría: {category}</h2>
      
      <FilterProducts category={category}/>
    </div>
  );
}
