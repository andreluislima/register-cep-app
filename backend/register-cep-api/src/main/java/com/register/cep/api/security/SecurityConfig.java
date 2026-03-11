package com.register.cep.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors(Customizer.withDefaults())
			.csrf(csrf -> csrf.disable())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(authorize -> authorize
					.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
					.requestMatchers(HttpMethod.POST, "/usuario/criarUsuario").permitAll()
					.requestMatchers(HttpMethod.GET, "/usuario/**").permitAll()
					.requestMatchers(HttpMethod.PUT, "/usuario/editar/**").permitAll()
					.requestMatchers(HttpMethod.DELETE, "/usuario/remover/**").permitAll()
					.requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
					.anyRequest().authenticated()
			);

		return http.build();
	}
}