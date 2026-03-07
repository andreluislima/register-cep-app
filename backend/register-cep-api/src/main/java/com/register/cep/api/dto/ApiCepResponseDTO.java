package com.register.cep.api.dto;

public record ApiCepResponseDTO(
		String logradouro,
		String bairro,
		String cidade,
		String estado
		) {

}
