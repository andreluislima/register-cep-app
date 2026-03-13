package com.register.cep.api.dto;

import jakarta.validation.constraints.NotBlank;

public record UsuarioRequestDTO(
		
		@NotBlank(message = "CEP é obrigatório")
		String cep, 
		
		@NotBlank(message = "Nome é obrigatório")
		String nome, 
		
		@NotBlank(message = "CPF é obrigatório")
		String cpf
		
		) 
{

}
