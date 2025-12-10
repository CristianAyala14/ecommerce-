import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"

function App() {

  return (
    <main>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
