package com.register.cep.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.register.cep.api.domain.Usuario;
import com.register.cep.api.dto.ApiCepResponseDTO;
import com.register.cep.api.dto.UsuarioRequestDTO;
import com.register.cep.api.repository.UsuarioRepository;

@Service
public class UsuarioServiceImplementation implements UsuarioServiceInterface{
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private ApiCepServiceInterface apiCepServiceInterface;
	
	

	@Override
	public Usuario criarUsuario(UsuarioRequestDTO dto) {
		
		if(usuarioRepository.findByCpf(dto.cpf()).isPresent()) {
			throw new RuntimeException(dto.cpf() + "CPF já cadastrado.");
		}
		
		
		ApiCepResponseDTO endereco = apiCepServiceInterface.buscarEnderecoPorCep(dto.cep());
		
		Usuario user  = new Usuario();
		user.setCep(dto.cep());
		user.setNome(dto.nome());
		user.setCpf(dto.cpf());
		
		user.setLogradouro(endereco.logradouro());
		user.setBairro(endereco.bairro());
		user.setCidade(endereco.localidade());
		user.setEstado(endereco.estado());
		
		user.setDataCriacao(user.getDataCriacao().now());
		user.setDataAtualizacao(user.getDataAtualizacao().now());
		
		return usuarioRepository.save(user);
	}

	@Override
	public Usuario editarUsuario(Long id, UsuarioRequestDTO dto) {
		Usuario user = usuarioRepository.findById(id).orElseThrow(
				() -> new RuntimeException("Usuário não encontrado.")
		);
		
		user.setCep(dto.cep());
		user.setNome(dto.nome());
		user.setCpf(dto.cpf());
		
		return usuarioRepository.save(user);
	}

	@Override
	public Usuario removerUsuario(Long id) {
		Usuario user = usuarioRepository.findById(id).orElseThrow(
				()-> new RuntimeException("Usuário não encontrado.")
		);
		
		usuarioRepository.delete(user);
		return  user;
	}

	@Override
	public List<Usuario> listarUsuarios() {
		List<Usuario> lista = usuarioRepository.findAll();
		return lista;
	}

}
