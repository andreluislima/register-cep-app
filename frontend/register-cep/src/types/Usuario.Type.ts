export type UsuarioResponse = {
  id: number;
  cep: string;
  nome: string;
  cpf: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type UsuarioRequest = {
  cep: string;
  nome: string;
  cpf: string;
};

export type CepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  estado: string;
};
