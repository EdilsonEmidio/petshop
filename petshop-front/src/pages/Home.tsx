import axios from "axios"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function Home(){
  // useeffect para expulsar da pagina

  const navigate = useNavigate();
  const [products,setProducts] = useState<Product[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    axios.get("http://localhost:8000/api/all_products",{
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response)=>{
      console.log(response.data);
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log(error);
    });

  },[]);


  const consultarProdutos = async()=>{
    
    const token = localStorage.getItem("token");
    try{
      await axios.post("http://localhost:8000/api/search_products",{"parametro":busca},{
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((response)=>{
        console.log(response.data);
        setProducts(response.data);
      })
    }catch(error){
      console.log(error);
    }
  }
  return(
    <div className="h-screen w-screen flex flex-col">

      <Header/>

      <div className="flex h-auto w-auto">
        
        <Sidebar setBusca={setBusca} consultar={consultarProdutos}/>

        <div className=" bg-sky-100 pt-5 pl-10 w-full flex flex-wrap gap-5">
          {
            products.map((product)=>(
              <Card key={product.id}
                id={product.id}
                nome={product.name} 
                descricao={product.description} 
                preco={product.price}
                compravel={true}
                removiveu={false}/>
            ))

          }
        </div>
      </div>
    </div>
  )
}