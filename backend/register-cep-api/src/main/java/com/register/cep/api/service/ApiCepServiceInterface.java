package com.register.cep.api.service;

import com.register.cep.api.dto.ApiCepResponseDTO;

public interface ApiCepServiceInterface {

	ApiCepResponseDTO buscarEnderecoPorCep(String cep);
	
}
