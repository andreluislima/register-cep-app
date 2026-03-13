"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

import "./FormCadastro.css";
import type { UsuarioRequest, UsuarioResponse } from "@/types/Usuario.Type";
import { useBuscarCep } from "@/hooks/integrations/useBuscarCep";
import { useCriarUsuario } from "@/hooks/integrations/useCreateUserMutation";
import { useEditarUsuario } from "@/hooks/integrations/useUpdateUseMutation";

type EstadoDaRota = {
  usuario?: UsuarioResponse;
};

const esquemaFormulario = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres."),
  cpf: z
    .string()
    .min(11, "O CPF deve ter pelo menos 11 caracteres.")
    .max(14, "O CPF deve ter no máximo 14 caracteres."),
  cep: z
    .string()
    .min(8, "O CEP deve ter pelo menos 8 caracteres.")
    .max(9, "O CEP deve ter no máximo 9 caracteres."),
  logradouro: z
    .string()
    .min(3, "O logradouro deve ter pelo menos 3 caracteres.")
    .max(100, "O logradouro deve ter no máximo 100 caracteres."),
  bairro: z
    .string()
    .min(2, "O bairro deve ter pelo menos 2 caracteres.")
    .max(60, "O bairro deve ter no máximo 60 caracteres."),
  cidade: z
    .string()
    .min(2, "A cidade deve ter pelo menos 2 caracteres.")
    .max(60, "A cidade deve ter no máximo 60 caracteres."),
  estado: z
    .string()
    .min(2, "O estado deve ter pelo menos 2 caracteres.")
    .max(30, "O estado deve ter no máximo 30 caracteres."),
});

type DadosFormulario = z.infer<typeof esquemaFormulario>;

type ErrosFormulario = Partial<Record<keyof DadosFormulario, string>>;

export function FormCadastro() {
  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [erros, setErros] = useState<ErrosFormulario>({});

  const buscarCep = useBuscarCep();
  const criarUsuario = useCriarUsuario();
  const editarUsuario = useEditarUsuario();

  const location = useLocation();
  const navigate = useNavigate();

  const { usuario } = (location.state as EstadoDaRota) || {};
  const estaEmModoEdicao = !!usuario;

  useEffect(() => {
    if (usuario) {
      setCep(usuario.cep || "");
      setNome(usuario.nome || "");
      setCpf(usuario.cpf || "");
      setLogradouro(usuario.logradouro || "");
      setBairro(usuario.bairro || "");
      setCidade(usuario.cidade || "");
      setEstado(usuario.estado || "");
      setErros({});
    }
  }, [usuario]);

  const limparErroDoCampo = (campo: keyof DadosFormulario) => {
    setErros((estadoAnterior) => ({
      ...estadoAnterior,
      [campo]: undefined,
    }));
  };

  const limparFormulario = () => {
    setCep("");
    setNome("");
    setCpf("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setEstado("");
    setErros({});
  };

  const validarFormulario = () => {
    const dadosFormulario: DadosFormulario = {
      nome,
      cpf,
      cep,
      logradouro,
      bairro,
      cidade,
      estado,
    };

    const resultado = esquemaFormulario.safeParse(dadosFormulario);

    if (resultado.success) {
      setErros({});
      return true;
    }

    const novosErros: ErrosFormulario = {};

    for (const issue of resultado.error.issues) {
      const campo = issue.path[0] as keyof DadosFormulario;

      if (!novosErros[campo]) {
        novosErros[campo] = issue.message;
      }
    }

    setErros(novosErros);

    toast("Verifique os campos do formulário.", {
      position: "bottom-right",
    });

    return false;
  };

  const handleBuscarCep = async () => {
    try {
      const resposta = await buscarCep.mutateAsync(cep);

      setLogradouro(resposta.logradouro || "");
      setBairro(resposta.bairro || "");
      setCidade(resposta.localidade || "");
      setEstado(resposta.estado || "");

      setErros((estadoAnterior) => ({
        ...estadoAnterior,
        cep: undefined,
        logradouro: undefined,
        bairro: undefined,
        cidade: undefined,
        estado: undefined,
      }));

      toast("CEP localizado com sucesso.", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(`Erro ao buscar o CEP: ${error}`);

      setLogradouro("");
      setBairro("");
      setCidade("");
      setEstado("");

      toast("Não foi possível localizar o CEP informado.", {
        position: "bottom-right",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const dadosUsuario: UsuarioRequest = {
      nome,
      cpf,
      cep,
    };

    if (estaEmModoEdicao && usuario) {
      editarUsuario.mutate(
        {
          id: usuario.id,
          data: dadosUsuario,
        },
        {
          onSuccess: () => {
            toast("Usuário atualizado com sucesso!", {
              position: "bottom-right",
            });
            limparFormulario();
            navigate("/");
          },
        },
      );
      return;
    }

    criarUsuario.mutate(dadosUsuario, {
      onSuccess: () => {
        toast("Usuário criado com sucesso!", {
          position: "bottom-right",
        });
        limparFormulario();
        navigate("/");
      },
    });
  };

  const handleCancelar = () => {
    limparFormulario();
  };

  let textoBotaoSalvar = "";

  if (estaEmModoEdicao) {
    textoBotaoSalvar = editarUsuario.isPending ? "Atualizando..." : "Atualizar";
  } else {
    textoBotaoSalvar = criarUsuario.isPending ? "Salvando..." : "Salvar";
  }

  // Máscaras
  // Máscara - CEP
  function formatarCep(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);
    if (numeros.length <= 5) return numeros;

    return numeros.slice(0, 5) + "-" + numeros.slice(5);
  }

  function formatarCPF(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 3) return numeros;

    if (numeros.length <= 6)
      return numeros.slice(0, 3) + "." + numeros.slice(3);

    if (numeros.length <= 9)
      return (
        numeros.slice(0, 3) + "." + numeros.slice(3, 6) + "." + numeros.slice(6)
      );

    return (
      numeros.slice(0, 3) +
      "." +
      numeros.slice(3, 6) +
      "." +
      numeros.slice(6, 9) +
      "-" +
      numeros.slice(9)
    );
  }

  return (
    <div className="container-form">
      <Card className="card-form">
        <CardHeader className="card-title p-3">
          <CardTitle>
            <h3>
              {estaEmModoEdicao ? "Editar Usuário" : "Cadastro de Usuário"}
            </h3>
          </CardTitle>
        </CardHeader>

        <CardContent className="card-content">
          <form
            id="formulario-usuario"
            onSubmit={handleSubmit}
            className="form-grid"
          >
            <FieldGroup className="row-cep">
              <Field data-invalid={!!erros.cep}>
                <FieldLabel htmlFor="cep">CEP</FieldLabel>
                <Input
                  id="cep"
                  value={cep}
                  onChange={(e) => {
                    setCep(formatarCep(e.target.value))
                    limparErroDoCampo("cep");
                  }}
                  placeholder="00000-000"
                  autoComplete="off"
                  aria-invalid={!!erros.cep}
                />
                {erros.cep && <FieldError errors={[{ message: erros.cep }]} />}
              </Field>

              <Button
                type="button"
                onClick={handleBuscarCep}
                disabled={buscarCep.isPending || !cep.trim()}
              >
                {buscarCep.isPending ? "Buscando..." : "Buscar"}
              </Button>
            </FieldGroup>

            <FieldGroup className="row-dados-pessoais">
              <Field data-invalid={!!erros.nome}>
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    limparErroDoCampo("nome");
                  }}
                  placeholder="Seu nome"
                  autoComplete="off"
                  aria-invalid={!!erros.nome}
                />
                {erros.nome && (
                  <FieldError errors={[{ message: erros.nome }]} />
                )}
              </Field>

              <Field data-invalid={!!erros.cpf}>
                <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(formatarCPF(e.target.value));
                    limparErroDoCampo("cpf");
                  }}
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  aria-invalid={!!erros.cpf}
                />
                {erros.cpf && <FieldError errors={[{ message: erros.cpf }]} />}
              </Field>
            </FieldGroup>

            <FieldGroup className="row-logradouro">
              <Field data-invalid={!!erros.logradouro}>
                <FieldLabel htmlFor="logradouro">Logradouro</FieldLabel>
                <Input
                  id="logradouro"
                  value={logradouro}
                  placeholder="Rua, Avenida, Travessa..."
                  autoComplete="off"
                  readOnly
                  aria-invalid={!!erros.logradouro}
                />
                {erros.logradouro && (
                  <FieldError errors={[{ message: erros.logradouro }]} />
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className="row-dados-api">
              <Field data-invalid={!!erros.bairro}>
                <FieldLabel htmlFor="bairro">Bairro</FieldLabel>
                <Input
                  id="bairro"
                  value={bairro}
                  placeholder="Bairro"
                  autoComplete="off"
                  readOnly
                  aria-invalid={!!erros.bairro}
                />
                {erros.bairro && (
                  <FieldError errors={[{ message: erros.bairro }]} />
                )}
              </Field>

              <Field data-invalid={!!erros.cidade}>
                <FieldLabel htmlFor="cidade">Cidade</FieldLabel>
                <Input
                  id="cidade"
                  value={cidade}
                  placeholder="Cidade"
                  autoComplete="off"
                  readOnly
                  aria-invalid={!!erros.cidade}
                />
                {erros.cidade && (
                  <FieldError errors={[{ message: erros.cidade }]} />
                )}
              </Field>

              <Field data-invalid={!!erros.estado}>
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <Input
                  id="estado"
                  value={estado}
                  placeholder="Estado"
                  autoComplete="off"
                  readOnly
                  aria-invalid={!!erros.estado}
                />
                {erros.estado && (
                  <FieldError errors={[{ message: erros.estado }]} />
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="footer-actions mt-4">
          <Button
            className="btn btn-cancelar"
            type="button"
            onClick={handleCancelar}
          >
            Cancelar
          </Button>

          <Button
            className="btn btn-submit"
            type="submit"
            form="formulario-usuario"
            disabled={criarUsuario.isPending || editarUsuario.isPending}
          >
            {textoBotaoSalvar}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
