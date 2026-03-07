package com.register.cep.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.register.cep.api.domain.Usuario;
import com.register.cep.api.dto.UsuarioRequestDTO;
import com.register.cep.api.repository.UsuarioRepository;

@Service
public class UsuarioServiceImplementation implements UsuarioServiceInterface{
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	

	@Override
	public Usuario criarUsuario(UsuarioRequestDTO dto) {
		if(usuarioRepository.findByCpf(dto.cpf()).isPresent()) {
			throw new RuntimeException(dto.cpf() + "CPF já cadastrado.");
		}
		
		Usuario user  = new Usuario();
		user.setCep(dto.cep());
		user.setCpf(dto.cpf());
		user.setNome(dto.nome());
		
		return usuarioRepository.save(user);
	}

	@Override
	public Usuario editarUsuario(Long id, UsuarioRequestDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario removerUsuario(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Usuario> listarUsuarios() {
		// TODO Auto-generated method stub
		return null;
	}

}
