package com.register.cep.api.dto;

public record ViaCepResponseDTO(
		String logradouro,
		String bairro,
		String cidade,
		String estado
		) {

}
