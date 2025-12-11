import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Products from "./pages/products/Products"
import About from "./pages/about/About"
import Contact from "./pages/contact/Contact"
import Cart from "./pages/cart/Cart"
import LogIn from "./pages/login/LogIn"
import Footer from "./components/footer/Footer"
import Profile from "./pages/profile/Profile"
function App() {

  return (
    <main>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
            <Route path=":productId" element={<Products/>}>
          </Route>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/login" element={<Profile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </main>
  )
}

export default App
