import { useEffect, useState } from "react";
import "./Form.css";
import { useCreateUser } from "../../hooks/integrations/useCreateUserMutation";
import { useBuscarCep } from "../../hooks/integrations/useBuscarCep";
import { useUpdateUser } from "../../hooks/integrations/useUpdateUseMutation";
import { useLocation, useNavigate } from "react-router-dom";
import type { UsuarioRequest, UsuarioResponse } from "../../types/Usuario.Type";

type LocationState = {
  usuario?: UsuarioResponse;
};

export default function Form() {
  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setLocalidade] = useState("");
  const [estado, setEstado] = useState("");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const buscarCep = useBuscarCep();

  const location = useLocation();
  const navigate = useNavigate();

  const { usuario } = (location.state as LocationState) || {};
  const isEditMode = !!usuario;

  useEffect(() => {
    if (usuario) {
      setCep(usuario.cep || "");
      setNome(usuario.nome || "");
      setCpf(usuario.cpf || "");
      setLogradouro(usuario.logradouro || "");
      setBairro(usuario.bairro || "");
      setLocalidade(usuario.cidade || "");
      setEstado(usuario.estado || "");
    }
  }, [usuario]);

  const handleBuscarCep = async () => {
    try {
      const response = await buscarCep.mutateAsync(cep);

      setLogradouro(response.logradouro || "");
      setBairro(response.bairro || "");
      setLocalidade(response.localidade || "");
      setEstado(response.estado || "");

    } catch (error) {
      console.log(`Erro ao buscar o CEP: ${error}`);
      alert("Não foi possível localizar o CEP informado.");
    }
  };

  const limparFormulario = () => {
    setCep("");
    setNome("");
    setCpf("");
    setLogradouro("");
    setBairro("");
    setLocalidade("");
    setEstado("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UsuarioRequest = {
      cep,
      nome,
      cpf,
    };

    if (isEditMode && usuario) {
      updateUser.mutate(
        {
          id: usuario.id,
          data,
        },
        {
          onSuccess: () => {
            alert("Usuário atualizado com sucesso!");
            limparFormulario();
            navigate("/");
          },
        }
      );
    } else {
      createUser.mutate(data, {
        onSuccess: () => {
          alert("Usuário cadastrado com sucesso!");
          limparFormulario();
          navigate("/");
        },
      });
    }
  };

  const handleCancelar = () => {
    limparFormulario();
    navigate("/");
  };

  return (
    <div className="container-form mb-5">
      <div className="content-form col-md-7 col-lg-8 p-5">
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-sm-3 mb-4">
              <label htmlFor="cep" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>

            <div className="col">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleBuscarCep}
                disabled={buscarCep.isPending || !cep.trim()}
              >
                {buscarCep.isPending ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-4">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="col-sm-4">
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
          </div>

          <hr className="divider mt-5" />

          <section className="content-api mt-5">
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label htmlFor="logradouro" className="form-label">
                  Logradouro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="logradouro"
                  value={logradouro}
                  readOnly
                />
              </div>

              <div className="col-sm-4">
                <label htmlFor="bairro" className="form-label">
                  Bairro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bairro"
                  value={bairro}
                  readOnly
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-3">
                <label htmlFor="cidade" className="form-label">
                  Cidade
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  value={cidade}
                  readOnly
                />
              </div>

              <div className="col-sm-4">
                <label htmlFor="estado" className="form-label">
                  Estado
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  value={estado}
                  readOnly
                />
              </div>
            </div>
          </section>

          <div className="row">
            <div className="col-sm-5 mt-5">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelar}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-success mx-4"
                disabled={createUser.isPending || updateUser.isPending}
              >
                {isEditMode
                  ? updateUser.isPending
                    ? "Atualizando..."
                    : "Atualizar"
                  : createUser.isPending
                  ? "Salvando..."
                  : "Salvar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}