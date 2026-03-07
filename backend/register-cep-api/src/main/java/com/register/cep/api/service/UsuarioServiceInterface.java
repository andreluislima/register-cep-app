package com.register.cep.api.service;

import java.util.List;

import com.register.cep.api.domain.Usuario;
import com.register.cep.api.dto.UsuarioRequestDTO;

public interface UsuarioServiceInterface {
	public Usuario criarUsuario (UsuarioRequestDTO dto);
	public Usuario editarUsuario(Long id, UsuarioRequestDTO dto);
	public Usuario removerUsuario(Long id);
	public List<Usuario>listarUsuarios();
}
