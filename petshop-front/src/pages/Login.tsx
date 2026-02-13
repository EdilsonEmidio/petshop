

import { useNavigate } from "react-router-dom";
import Image from "../../public/pets-login.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function Login(){

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/home");
    }
  },[])
  const [usuario,setUsuario] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const input = "bg-gray-200 rounded-md p-1 outline-none focus:ring-sky-500 focus:border text-black w-full";
  
  const logar = ()=>{
      axios.post("http://localhost:8000/api/login_user",usuario,{
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
      .then((response)=>{
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch((error)=>{
        toast.error('ERRO! Credencias invalidas!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log(error);
      })
    
  }

  return(
    
    <div className="h-screen bg-white w-screen grid grid-cols-2">
      
      <div className="text-xl bg-sky-200 h-screen flex flex-col justify-center items-center">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <h1 className="text-5xl font-extrabold text-sky-900">Pet feliz</h1>
        

        <div className="flex flex-col gap-4 mt-8 p-8 border-sky-700 rounded-lg border-2 bg-sky-500 shadow-lg shadow-sky-700">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <label htmlFor="">Email</label>
          <input type="email" className={input}   
            onChange={(e)=>setUsuario((prev)=>({...prev,"email":e.target.value}))}/>

          <label htmlFor="">Senha</label>
          <input type="password" className={input}
            onChange={(e)=>setUsuario((prev)=>({...prev,"password":e.target.value}))}/>
          
          <button className="mt-3 hover:bg-sky-700 bg-sky-900 rounded-lg p-2 text-white font-bold cursor-pointer" onClick={()=>logar()}>Entrar</button>

          <h3 className="text-lg hover:text-white w-fit cursor-pointer"
          onClick={()=>navigate("/")}>Não tem uma conta?</h3>
        </div>
        
      </div>
      
      <img src={Image} alt="" className="h-screen w-screen"/>
    </div>
    
  )
}