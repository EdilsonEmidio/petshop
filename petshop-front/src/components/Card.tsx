
type props = {
  id : number,
  nome: string,
  descricao: string,
  preco: number,
  compravel: boolean
}

import axios from "axios";

export default function Card({id, nome, descricao, preco, compravel}: props){

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const comprar = async (id: number) => {
    await axios.post("http://localhost:8000/api/buy_product",{"id_product":id},{
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
    .then((response)=>{
      console.log(response.data);
      alert("Produto comprado com sucesso!");
    })
    .catch((error)=>{
      console.log(error);
      alert("Erro ao comprar produto!");
    });
  }
  
  return(
    <div className="bg-sky-300 w-1/5 rounded-lg flex flex-col items-center justify-center border p-5">
      <h2 className="text-xl font-bold text-sky-950 mb-2 text-center">{nome}</h2>
      <p className="text-lg text-sky-950 mb-2">{descricao}</p>

      <div className="mt-auto">
        <h3 className=" text-lg text-sky-950">{formatter.format(preco)}</h3>
      {
        compravel && 
        (
          <button className=" bg-sky-50 p-2 rounded-2xl hover:cursor-pointer hover:bg-sky-400" onClick={()=>comprar(id)}>
            Comprar
          </button>
        )
      }
        
      </div>
      
    </div>
  );
}