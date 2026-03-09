import "./App.css";

function App() {
  return (
    <>
      <div className="container-fluid">
        {/* Header */}
        <div className="container-header">
          <div className="content-title">
            <h1>CEP Register - Sistema de Consulta e Gerenciamento de Endereços</h1>
          </div>
          <div className="content-btn">
            <button className="btn btn-primary">Novo Registro</button>
          </div>
        </div>

        {/* Table */}
        <div className="content-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">CEP</th>
                <th scope="col">Endereço</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>André Lima</td>
                <td>123.456.789-00</td>
                <td>22776-050</td>
                <td>Rua Água Doce, Jardim Piatã A - Mogi das Cruzes/SP</td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>

              <tr>
                <th scope="row">2</th>
                <td>Maria Souza</td>
                <td>987.654.321-00</td>
                <td>01001-000</td>
                <td>Praça da Sé - São Paulo/SP</td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>

              <tr>
                <th scope="row">3</th>
                <td>João Silva</td>
                <td>456.789.123-00</td>
                <td>20040-020</td>
                <td>Rua da Assembleia - Rio de Janeiro/RJ</td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>

              <tr>
                <th scope="row">4</th>
                <td>Ana Costa</td>
                <td>321.654.987-00</td>
                <td>30140-071</td>
                <td>Av. Afonso Pena - Belo Horizonte/MG</td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
