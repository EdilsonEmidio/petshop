import { useNavigate } from "react-router-dom";
import Image from "../../public/pets-login.jpg"
import { useState } from "react";
import axios from "axios";

const input = "bg-gray-200 rounded-md p-1 outline-none focus:ring-sky-500 focus:border text-black w-full";

export default function Cadastro(){

  const [usuario,setUsuario] = useState({
      name: "",
      email: "",
      password: ""
    })
  const navigate = useNavigate();

  const cadastrar = ()=>{

    axios.post("http://localhost:8000/api/sign_user",usuario,{
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
    .then((response)=>{
      console.log(response.data);
      navigate("/login");
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return(
    <div className="h-screen bg-white w-screen grid grid-cols-2">
      <div className="text-xl bg-sky-200 h-screen flex flex-col justify-center items-center">

        <h1 className="text-5xl font-extrabold text-sky-900">Pet feliz</h1>
        

        <div className="flex flex-col gap-4 mt-8 p-8 border-sky-700 rounded-lg border-2 bg-sky-500 shadow-lg shadow-sky-700 ">
          <h1 className="text-3xl font-bold text-center">Cadastro</h1>

          <label htmlFor="">Nome</label>
          <input type="text" className={input} 
          onChange={(e)=>setUsuario((prevName)=>({...prevName,"name":e.target.value}))}/>

          <label htmlFor="">Email</label>
          <input type="email" className={input}
          onChange={(e)=>setUsuario((prevName)=>({...prevName,"email":e.target.value}))}/>

          <label htmlFor="">Senha</label>
          <input type="password"  className={input}
          onChange={(e)=>setUsuario((prevName)=>({...prevName,"password":e.target.value}))}/>
          
          <button className="mt-3 hover:bg-sky-700 bg-sky-900 rounded-lg p-2 text-white font-bold cursor-pointer" onClick={()=>cadastrar()}>
            Cadastrar</button>

          <h3 className="text-lg hover:text-white w-fit cursor-pointer"
           onClick={()=> navigate("/login")}>
            Já tem uma conta?
          </h3>
        </div>
        
      </div>
      <img src={Image} alt="" className="md:visible h-screen w-screen invisible"/>

    </div>
  )
}