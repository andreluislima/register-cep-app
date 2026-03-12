"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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

import "./FormShad.css";

const formSchema = z.object({
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

type FormData = z.infer<typeof formSchema>;

export function FormShad() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  function onSubmit(data: FormData) {
    toast("Formulário enviado com sucesso", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-black p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });
  }

  function handleBuscarCep() {
    const cep = form.getValues("cep");

    toast("Busca de CEP", {
      description: `Buscar CEP: ${cep}`,
      position: "bottom-right",
    });

    // Aqui depois você pode integrar com sua API / hook
    // e usar form.setValue("logradouro", "...");
    // form.setValue("bairro", "...");
    // form.setValue("cidade", "...");
    // form.setValue("estado", "...");
  }

  return (
    <div className="container-form">
      <Card className="card-form">
        <CardHeader>
          <CardTitle>Cadastro de Usuário</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="form-grid"
          >
            <FieldGroup className="row-cep">
              <Controller
                name="cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cep">CEP</FieldLabel>
                    <Input
                      {...field}
                      id="cep"
                      aria-invalid={fieldState.invalid}
                      placeholder="00000-000"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="button" onClick={handleBuscarCep}>
                Buscar
              </Button>
            </FieldGroup>

            <FieldGroup className="row-dados-pessoais">
              <Controller
                name="nome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="nome">Nome</FieldLabel>
                    <Input
                      {...field}
                      id="nome"
                      aria-invalid={fieldState.invalid}
                      placeholder="Seu nome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="cpf"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                    <Input
                      {...field}
                      id="cpf"
                      aria-invalid={fieldState.invalid}
                      placeholder="000.000.000-00"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="row-logradouro">
              <Controller
                name="logradouro"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="logradouro">Logradouro</FieldLabel>
                    <Input
                      {...field}
                      id="logradouro"
                      aria-invalid={fieldState.invalid}
                      placeholder="Rua, Avenida, Travessa..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="row-dados-api">
              <Controller
                name="bairro"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bairro">Bairro</FieldLabel>
                    <Input
                      {...field}
                      id="bairro"
                      aria-invalid={fieldState.invalid}
                      placeholder="Bairro"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="cidade"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cidade">Cidade</FieldLabel>
                    <Input
                      {...field}
                      id="cidade"
                      aria-invalid={fieldState.invalid}
                      placeholder="Cidade"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="estado"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="estado">Estado</FieldLabel>
                    <Input
                      {...field}
                      id="estado"
                      aria-invalid={fieldState.invalid}
                      placeholder="Estado"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="footer-actions">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>

          <Button type="submit" form="form-rhf-demo">
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}