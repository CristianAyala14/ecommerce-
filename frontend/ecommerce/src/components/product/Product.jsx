import React from 'react'
import { useParams } from 'react-router-dom'

export default function Product() {
  const { productId } = useParams();

  return (
    <div>
      <h1>Producto: {productId}</h1>
    </div>
  )
}
