package com.register.cep.api.dto;

public record UsuarioResponseEditadoDTO(
		String mensagem,
		Long id,
		String cep,
		String nome,
		String cpf,
		String logradouro,
		String bairro,
		String cidade,
		String estado
		) 
{

}
