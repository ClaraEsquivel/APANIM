package com.example.apanim.config; // (o pacote pode ser outro)

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // Importe este
import org.springframework.security.config.http.SessionCreationPolicy; // Importe este
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Bean do BCrypt que você já deve ter
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desabilita o CSRF (Resolve o erro 403 Forbidden)
            .csrf(AbstractHttpConfigurer::disable) 
            
            // 2. Define a política de sessão como STATELESS (padrão de API REST)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 3. Define as regras de autorização
            .authorizeHttpRequests(authorize -> authorize
                
                // Permite acesso PÚBLICO a todos os seus endpoints da API
                .requestMatchers("/usuarios/**").permitAll()
                .requestMatchers("/animalPerdido/**").permitAll() // <-- Permite este endpoint
                .requestMatchers("/animalAdocao/**").permitAll()
                .requestMatchers("/animalCompra/**").permitAll()
                .requestMatchers("/vendedor/**").permitAll()
                
                // Exige autenticação para qualquer outra coisa (opcional por agora)
                .anyRequest().authenticated()
            );

        return http.build();
    }
}