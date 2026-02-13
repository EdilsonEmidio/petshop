import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"
import Carrinho from "./pages/Carrinho"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Login} path="/login"/>
        <Route Component={Cadastro} path="/"/>
        <Route Component={Home} path="/home"/>
        <Route Component={Carrinho} path="/carrinho"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
