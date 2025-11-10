package com.example.apanim.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desabilita o CSRF, pois estamos criando uma API REST
            .csrf(csrf -> csrf.disable())
            
            // 2. Torna a sessão "stateless" (não guarda estado), padrão para APIs REST
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 3. Define as regras de autorização
            .authorizeHttpRequests(authorize -> authorize
                // Permite TODAS as requisições (GET, POST, PUT, DELETE) para /animais e /usuarios
                .requestMatchers(HttpMethod.POST, "/animais/**", "/usuarios/**", "/vendedor/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/animais/**", "/usuarios/**", "/vendedor/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/animais/**", "/usuarios/**", "/vendedor/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/animais/**", "/usuarios/**", "/vendedor/**").permitAll()
                
                // Habilita o console do H2 (se você estiver usando)
                .requestMatchers("/h2-console/**").permitAll()
                
                // Para qualquer OUTRA requisição, exige autenticação (opcional por enquanto)
                .anyRequest().authenticated()
            );

        // Permite que o H2 Console seja exibido em frames (necessário para o console)
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }

   
}
