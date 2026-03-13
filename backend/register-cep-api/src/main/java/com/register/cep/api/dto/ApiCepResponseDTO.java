package com.register.cep.api.dto;

public record ApiCepResponseDTO(
		String logradouro,
		String bairro,
		String localidade,
		String estado
		)
{

}
