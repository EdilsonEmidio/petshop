import { use, useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function Sidebar(){

  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [quantTotal,setQuantTotal] = useState(0);
  const [precoTotal,setPrecoTotal] = useState(0);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    axios.post("http://localhost:8000/api/your_products",{},{
      headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      }}) 
      .then((response)=>{
        console.log(response.data);
        setProducts(response.data[1]);
        
        setQuantTotal(response.data[0]['quantTotal']);
        setPrecoTotal(response.data[0]['precoTotal']);
      })
      .catch((error)=>{
        console.log(error);
      });
  },[]);


  return(
    <div className="h-screen w-screen bg-sky-200 flex flex-col">
      <Header/>
      <div className="flex ml-5 mt-5 gap-50">
        <h1 className="text-2xl font-bold">Total de produtos: {quantTotal}</h1>
        <h1 className="text-2xl font-bold ">Preço total: {precoTotal} </h1>
      </div>
      
      <div className="bg-sky-100 pt-5 pl-10 w-full flex flex-wrap gap-5">
        {
          products.map((product,key)=>(
            <Card key={key}
              id={product.id}
              nome={product.name} 
              descricao={product.description} 
              preco={product.price}
              compravel={false}/>
          ))
        }

      </div>
    </div>
  );
} 