import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "./TableShad.css";
import type { UsuarioResponse } from "@/types/Usuario.Type";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "@/hooks/integrations/useDeleteUserMutation";

type TableProps = {
  usuarios: UsuarioResponse[];
};

export default function TableShad({ usuarios }: TableProps) {
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Deseja realmente excluir esse usuário?");
    if (!confirmDelete) return;

    deleteUser.mutate(id);
  };

  const handleEdit = (usuario: UsuarioResponse) => {
    navigate("/novo-registro", {
      state: { usuario },
    });
  };

  return (
    <>
      <div className="content-table">
        <Table className="table">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="table-header">
            <TableRow>
              <TableHead className="table-head-data">Id</TableHead>
              <TableHead className="table-head-data">Nome</TableHead>
              <TableHead className="table-head-data">CEP</TableHead>
              <TableHead className="table-head-data">CPF</TableHead>
              <TableHead className="table-head-data">Endereço</TableHead>
              <TableHead className="table-head-actions">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.cep}</TableCell>
                <TableCell className="">{usuario.cpf}</TableCell>
                <TableCell className="">
                  {usuario.logradouro}, {usuario.bairro}, {usuario.cidade} -{" "}
                  {usuario.estado}
                </TableCell>

                <TableCell className="table-button">
                  <button className="btn btn-edit" onClick={() => handleEdit(usuario)}>Editar</button>

                  <button className="btn btn-delete" onClick={() => handleDelete(usuario.id)}>
                    Excluir
                  </button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total de Endereços</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
