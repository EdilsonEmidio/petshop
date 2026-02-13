
type Props = {
  setBusca: React.Dispatch<React.SetStateAction<string>>;
  consultar: () => void;
};

export default function Sidebar({setBusca, consultar}:Props){


  return(
    <div className="bg-sky-300 pl-3 w-1/5 h-auto pt-3 text-center">


      <h2 className="text-xl font-bold text-sky-950 mb-2 ">
        O que está procurando?
      </h2>

      <input type="text" className="bg-sky-50 border rounded-2xl w-9/10 p-1" placeholder="Qual o seu produto?" 
      onChange={(e)=>setBusca(e.target.value)}/>

      <button className="bg-sky-700 mt-5 py-2 px-4 rounded-2xl text-lg hover:cursor-pointer text-white hover:bg-sky-900"
      onClick={()=>consultar()}>
        Buscar
      </button>
      
    </div>
  );
} 