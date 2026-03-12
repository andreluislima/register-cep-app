import TableShad from "@/components/Table/TableShad";
import { useGetUsers } from "../../hooks/integrations/useUsersQuery";
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
        {/* <Table usuarios = {usuarios ?? []} /> */}
        <TableShad usuarios = {usuarios ?? []}/>
      </div>
    </>
  );
}
