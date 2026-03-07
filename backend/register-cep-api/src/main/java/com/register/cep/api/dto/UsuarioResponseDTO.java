package com.register.cep.api.dto;

import java.time.LocalDateTime;

public record UsuarioResponseDTO(
		Long id,
		String cep,
		String nome,
		String cpf,
		LocalDateTime dataCriacao,
		LocalDateTime dataAtualizacao
		) {

}
