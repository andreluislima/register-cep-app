export type UsuarioResponse = {
    id:number;
    nome:string;
    cpf:string;
    cep:string;
    logradouro:string;
    bairro:string;
    localidade:string;
    estado:string;
}

export type UsuarioRequest = {
    cep: string;
    nome: string;
    cpf: string;
}

export type CepResponse = {
    logradouro:string;
    bairro:string;
    localidade:string;
    estado:string;
}