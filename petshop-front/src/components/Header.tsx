

import { useNavigate } from "react-router-dom";
import Icon from "../assets/carrinho-de-compras.png"
import axios from "axios"

export default function Header(){
  const navigate = useNavigate();

  const sair = ()=>{
    axios.post("http://localhost:8000/api/logout_user",{},
      {
      headers:{
        "Content-Type":"application/json",
        "accept":"application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=>{
      console.log(response.data);
      localStorage.removeItem("token");
      navigate("/login");
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return(

    <div className="bg-sky-500 flex justify-between p-3">
      <h1 className="text-4xl font-extrabold mt-2 ml-5 text-sky-950 hover:cursor-pointer hover:text-sky-300"
      onClick={()=>navigate("/home")}>
        Bem Vindo ao Pet Feliz
      </h1>

      <div className="flex">

        <img src={Icon} alt="Carrinho de compras" 
        className="w-15 p-2 mr-10 hover:bg-sky-300 hover:rounded-2xl hover:cursor-pointer"
        onClick={()=>navigate("/carrinho")}/>


        <button className="mr-10 bg-sky-600 rounded-2xl py-0 px-5 
          text-white hover:bg-sky-300 hover:text-black hover:cursor-pointer" 
          onClick={()=>sair()}>
            Sair
          </button>
      </div>
      
    </div>
  );
}