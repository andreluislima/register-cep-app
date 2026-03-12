import type { UsuarioResponse } from "../../types/Usuario.Type";
import "./Table.css";

type TableProps = {
  usuarios: UsuarioResponse[];
};

export default function Table({ usuarios }: TableProps) {

  return (
    <>
      <div className="content-table">
        <table className="table table-striped">
          <thead className="thead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">CEP</th>
              <th scope="col">Endereço</th>
              <th className="actions" scope="col">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="tbody">
            {usuarios.map((usuario, index) => (
              <tr key={usuario.id}>
                <th scope="row">{index + 1}</th>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.cep}</td>
                <td>
                  {usuario.logradouro}, {usuario.bairro} - {usuario.logradouro} - {usuario.estado}
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
