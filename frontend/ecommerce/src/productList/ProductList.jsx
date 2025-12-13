import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { MdArrowBack, MdArrowForward  } from "react-icons/md";
import Item from "../components/item/Item";
import { all_products } from "../assets/productListProductsMockUp";
import banner from "../assets/nuevosIngresos1.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProductsReq } from "../apiCalls/productsCalls";

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
    category: ""
  });

  useEffect(() => {
    setPage(1);
  }, [category]);

  // Sincronizar filtros con URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sortFromUrl = urlParams.get("sort") || "createdAt";
    const orderFromUrl  = urlParams.get("order") || "desc";
    const categoryFromUrl  = urlParams.get("category") || "";

    if(
      sortFromUrl  || orderFromUrl  || categoryFromUrl
    ){
      setFilters({ sort: sortFromUrl, order:orderFromUrl , category: categoryFromUrl });
    }



    const fetchProducts = async()=>{
      setLoading(true);
      try {
            const searchQuery = urlParams.toString();
                console.log(searchQuery)

            const res = await getAllProductsReq(searchQuery)
            console.log(res)
              
      } catch (error) {
        console.log(res)
      }
    }
    fetchProducts();

  }, [location.search]);

  

  // Manejar cambio de filtro o categoría
  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(location.search);

    if (type === "sort") {
      const [sort, order] = value.split("_");
      setFilters(prev => ({ ...prev, sort, order })); // ✅ conserva category
      params.set("sort", sort);
      params.set("order", order);
    }

    if (type === "category") {
      params.set("category", value);
      setFilters(prevFilters => ({ ...prevFilters, category: value }));
    }

    navigate(`?${params.toString()}`);
    setPage(1); // resetear paginación
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
              onChange={(e) => handleFilterChange("category", e.target.value)}
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
              onChange={(e) => handleFilterChange("sort", e.target.value)}
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
