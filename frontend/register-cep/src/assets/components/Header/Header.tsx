import NavBar from "../NavBar/NavBar";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="container-header">
        <NavBar />
        <div className="content-title mb-4">
          <h1>
            CEP Register - Sistema de Consulta e Gerenciamento de Endereços
          </h1>
        </div>
        <div className="content-btn mb-4">
          <button className="btn btn-primary">Novo Registro</button>
        </div>
      </div>
    </>
  );
}
