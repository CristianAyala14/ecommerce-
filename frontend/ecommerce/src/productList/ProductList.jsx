import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { MdArrowBack, MdArrowForward  } from "react-icons/md";
import Item from "../components/item/Item";
import { all_products } from "../assets/productListProductsMockUp";
import banner from "../assets/nuevosIngresos1.jpeg";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductList({ category }) {

    const categorias = ["Tecnología", "Moda", "Comida", "Perros", "Bazar"];


  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;


  const [filters, setFilters] = useState({
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    setPage(1);
  }, [category]);

  // Sincronizar filtros con URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sort = params.get("sort") || "createdAt";
    const order = params.get("order") || "desc";
    setFilters({ sort, order });
  }, [location.search]);

  // Filtrar, ordenar y paginar
  useEffect(() => {
    setLoading(true);

    let result = category
      ? all_products.filter(item => item.category === category)
      : all_products;

    // Ordenar
    result = [...result].sort((a, b) => {
      if (filters.sort === "regularPrice") {
        return filters.order === "asc"
          ? a.new_price - b.new_price
          : b.new_price - a.new_price;
      }
      return filters.order === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Paginar
    const start = (page - 1) * limit;
    const end = start + limit;
    setProducts(result.slice(start, end));

    setLoading(false);
  }, [category, filters, page]);





  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    const [sort, order] = e.target.value.split("_");
    setFilters({ sort, order });

    const params = new URLSearchParams(location.search);
    params.set("sort", sort);
    params.set("order", order);
    navigate(`?${params.toString()}`);
    setPage(1); // reset page al cambiar filtro
  };

  // Manejar paginación
  const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage(prev => prev + 1);

  const totalPages = Math.ceil(
    (category ? all_products.filter(item => item.category === category).length : all_products.length) / limit
  );

  return (
    <section className="productList-container">
      {/* Banner */}
      <div className="title-banner-category" style={{ backgroundImage: `url(${banner})` }}>
        <p className="productList-title">{category || "Nuestros productos"}</p>
      </div>

      {/* Info + filtros */}
      <div className="productList-info-filters">
        Mostrando {products.length} de{" "}
        {category ? all_products.filter(item => item.category === category).length : all_products.length} productos


        <div className="productList-filter">
          <div>
            <label>Categoria:</label>
            <select
            className="productList-filter-select"
              value={category || ""}
              onChange={(e) => {
                const params = new URLSearchParams(location.search);
                params.set("category", e.target.value); // actualizar URL
                navigate(`?${params.toString()}`);
              }}
            >
              <option value="">All</option>
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div> 
            <label>Sort by:</label>
            <select
              className="productList-filter-select"
              value={`${filters.sort}_${filters.order}`}
              onChange={handleFilterChange}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>  
          </div>
          
          
        </div>
      </div>

      {/* Paginación */}
      <div className="productList-pagination">
        <button className="productLists-pagination-buttons" onClick={handlePrevPage} disabled={page === 1}>
          <MdArrowBack size="0.5em" />
        </button>
        <span>Page {page} of {totalPages}</span>
        <button className="productLists-pagination-buttons" onClick={handleNextPage} disabled={page === totalPages}>
          <MdArrowForward size="0.5em" />
        </button>
      </div>

      {/* Productos */}
      <div className="productList-products-container">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          products.map(item => (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        )}
      </div>
    </section>
  );
}
