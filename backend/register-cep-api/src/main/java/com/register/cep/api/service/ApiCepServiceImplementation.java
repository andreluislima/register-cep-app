package com.register.cep.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.register.cep.api.dto.ApiCepResponseDTO;

@Service
public class ApiCepServiceImplementation implements ApiCepServiceInterface {

	private RestTemplate restTemplate  = new RestTemplate();
	
	@Override
	public ApiCepResponseDTO buscarEnderecoPorCep(String cep) {
		
		String cepLimpo = cep.replaceAll("\\D", "");
		
		if(cepLimpo.length() != 8) {
			throw new RuntimeException("Cep inválido. Informe apenas 8 digitos.");
		}
		
		String urlApi = "https://viacep.com.br/ws/" + cepLimpo + "/json/";
		ApiCepResponseDTO response = restTemplate.getForObject(urlApi, ApiCepResponseDTO.class);
		
		if(response == null) {
			throw new RuntimeException("Não foi possível consultar o endereço");
		}
		
		return response;
	}

}
