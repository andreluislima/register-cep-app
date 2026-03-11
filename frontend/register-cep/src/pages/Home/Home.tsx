import Table from "../../components/Table/Table";
import { useGetUsers } from "../../integrations/Mutation";
import "./Home.css";

export default function Home() {
  const {data: usuarios, isLoading, isError, error} = useGetUsers();
  if(isLoading){
    return <p>Carregando usuarios</p>
  }
  if(isError){
    return <p>Erro ao buscar usuarios: {error.message}</p>
  }
  
  return (
    <>
      <div className="container-home">
        <Table usuarios = {usuarios ?? []} />
      </div>
    </>
  );
}
