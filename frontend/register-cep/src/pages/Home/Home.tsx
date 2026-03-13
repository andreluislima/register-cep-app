import TableUsuarios from "../../components/Table/TableUsuarios";
import { useGetUsers } from "../../hooks/integrations/useUsersQuery";
import "./Home.css";

export default function Home() {
  const { data: usuarios, isLoading, isError , error} = useGetUsers();

  if (isLoading) {
    return <p>Carregando usuarios</p>;
  }
  if (isError) {
    return <p>Erro ao buscar usuarios. Erro: {error.name}</p>;
  }

  console.log("usuarios recebidos:", usuarios);

  return (
    <div className="container-home">
      <TableUsuarios usuarios={[]} />
    </div>
  );
}
