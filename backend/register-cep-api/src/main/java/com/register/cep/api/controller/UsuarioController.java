package com.register.cep.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.register.cep.api.domain.Usuario;
import com.register.cep.api.dto.ApiCepResponseDTO;
import com.register.cep.api.dto.UsuarioRequestDTO;
import com.register.cep.api.dto.UsuarioResponseDTO;
import com.register.cep.api.dto.UsuarioResponseEditadoDTO;
import com.register.cep.api.dto.UsuarioResponseRemovidoDTO;
import com.register.cep.api.repository.UsuarioRepository;
import com.register.cep.api.service.ApiCepServiceInterface;
import com.register.cep.api.service.UsuarioServiceInterface;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuario", description = "Atividades relacionadas ao cadastro de Usuário.")
public class UsuarioController {

	@Autowired
	UsuarioServiceInterface usuarioServiceInterface;
	
	@Autowired
	ApiCepServiceInterface apiServiceInterface;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@GetMapping("/buscarCep/{cep}")
	@Operation(
			summary = "Buscar CEP ",
			description = "Busca o CEP e retorna os dados de endereço utilizando a  API externa  Via CEP"
			)
	public ResponseEntity<?>buscarCep(@PathVariable String cep){
		ApiCepResponseDTO endereco = apiServiceInterface.buscarEnderecoPorCep(cep);
		return ResponseEntity.ok(endereco);
		
	}
	
	@PostMapping("/criarUsuario")
	@Operation(
			summary = "Cadastrar usuário",
			description = "Cadastra um usuário a partir do nome e cpf. O endereço é gerado automaticamente a partir do cep informado."
			)
	public ResponseEntity<?>criarUsuario(@RequestBody @Valid UsuarioRequestDTO dto){
		Optional<Usuario>user = usuarioRepository.findByCpf(dto.cpf());
		if(user.isPresent()) {
			return ResponseEntity.badRequest().body("Usuário já cadastrado");
		}
		
		Usuario usuario = usuarioServiceInterface.criarUsuario(dto);
		
		usuarioRepository.save(usuario);
		
		return ResponseEntity.ok(new UsuarioResponseDTO(
				"Usuário inserido com sucesso!",
				usuario.getId(), 
				usuario.getCep(), 
				usuario.getNome(), 
				usuario.getCpf(), 
				usuario.getLogradouro(),
				usuario.getBairro(),
				usuario.getCidade(),
				usuario.getEstado(),
				usuario.getDataCriacao(), 
				usuario.getDataAtualizacao()
			)
		);
	}
	
	@GetMapping("/usuarios")
	@Operation(
			summary = "Exibir usuários ",
			description = "Retorna a lista de  todos os usuários cadastrados. "
			)
	public ResponseEntity<List<Usuario>>listarUsuarios(){
		List<Usuario>usuarios = usuarioServiceInterface.listarUsuarios();
		return ResponseEntity.ok(usuarios);
	}
	
	@PutMapping("/editar/{id}")
	@Operation(
			summary = "Atualiza usuário ",
			description = "Atualiza os dados de um usuário especifico com base no ID informado."
			)
	public ResponseEntity<UsuarioResponseEditadoDTO>editarUsuario(@PathVariable Long id,  @RequestBody UsuarioRequestDTO dto){
		Usuario usuario = usuarioServiceInterface.editarUsuario(id, dto);
		return ResponseEntity.ok(new UsuarioResponseEditadoDTO(
				
				"Usuário editado com sucesso!",
				usuario.getId(), 
				usuario.getCep(), 
				usuario.getNome(), 
				usuario.getCpf(), 
				usuario.getLogradouro(),
				usuario.getBairro(),
				usuario.getCidade(),
				usuario.getEstado()
				));
	}
	
	@DeleteMapping("/remover/{id}")
	@Operation(
			summary = "Remover Usuário ",
			description = "Remove um usuário a partir do ID informado."
			)
	public ResponseEntity<UsuarioResponseRemovidoDTO>removerUsuario(@PathVariable Long id){
		Usuario usuario = usuarioServiceInterface.removerUsuario(id);
		
		return ResponseEntity.ok(new UsuarioResponseRemovidoDTO(
				"Usuário removido com sucesso!",
				usuario.getId(),
				usuario.getCpf()
		));
		
	}
	

}
