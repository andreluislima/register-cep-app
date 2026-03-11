import { useState } from "react";
import "./Form.css";
import { useCreateUser } from "../../hooks/integrations/useCreateUserMutation";
import { useBuscarCep } from "../../hooks/integrations/useBuscarCep";

export default function Form() {

  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [estado, setEstado] = useState("");

  const createUser = useCreateUser();
  const buscarCep = useBuscarCep();

  const handleBuscarCep = async () => {
    try{
      const response = await buscarCep.mutateAsync(cep);

      setLogradouro(response.logradouro || "");
      setBairro(response.bairro || "");
      setLocalidade(response.localidade || "");
      setEstado(response.estado || "");

    
    }catch(error){
      console.log(`Erro ao buscar o cep, ${error}`);
      alert("Não foi possível localizar o CEP informado.")
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser.mutate({
      cep,
      nome,
      cpf
    });
  };

  const handleCancelar = () => {
    setCep("");
    setNome("");
    setCpf("");
    setLogradouro("");
    setBairro("");
    setLocalidade("");
    setEstado("");
  }

  return (
    <div className="container-form mb-5">
      <div className="content-form col-md-7 col-lg-8 p-5">
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-sm-3 mb-4">
              <label htmlFor="firstName" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col">
              <button className="btn btn-outline-primary"
                onClick={handleBuscarCep}
                disabled = {buscarCep.isPending || !cep.trim()}
              >
              {buscarCep.isPending ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-4">
              <label htmlFor="firstName" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-sm-4">
              <label htmlFor="lastName" className="form-label">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>
          
          <hr className="divider mt-5" />
          <section className="content-api mt-5">
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  Logradouro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value={logradouro}
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-4">
                <label htmlFor="lastName" className="form-label">
                  Bairro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value={bairro}
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-3">
                <label htmlFor="firstName" className="form-label">
                  Cidade
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value={localidade}
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-4">
                <label htmlFor="lastName" className="form-label">
                  Estado
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value={estado}
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
          </section>

          <div className="row">
            <div className="col-sm-3 mt-5">
              <button 
                className="btn btn-secondary"
                onClick={handleCancelar}
                >Cancelar
                </button>

              <button className="btn btn-success mx-4"
                disabled = {createUser.isPending}
              >
                {createUser.isPending ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
