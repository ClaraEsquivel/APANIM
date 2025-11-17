package com.example.apanim.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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
            // 1. Desabilita o CSRF (ISSO CORRIGE O SEU ERRO 403)
            .csrf(AbstractHttpConfigurer::disable) 
            
            // 2. Define a política de sessão como STATELESS (padrão de API REST)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 3. Define as regras de autorização
            .authorizeHttpRequests(authorize -> authorize
                
                // --- PERMISSÕES DE ACESSO PÚBLICO ---
                
                // Permite qualquer método (POST, GET, etc.) para os endpoints principais
                .requestMatchers("/usuarios/**").permitAll()
                .requestMatchers("/animalPerdido/**").permitAll() // <-- O endpoint que você está testando
                .requestMatchers("/animalAdocao/**").permitAll()
                .requestMatchers("/animalCompra/**").permitAll()
                .requestMatchers("/vendedor/**").permitAll()
                .requestMatchers("/assinaturas/**").permitAll() // Permite criar e gerenciar assinaturas
                .requestMatchers("/planos/**").permitAll() // Permite criar e gerenciar assinaturas

                // CRÍTICO: Permite o Webhook do Gateway de Pagamento
                .requestMatchers("/webhook/**").permitAll()
                
                // Para qualquer outra requisição, exige autenticação
                .anyRequest().authenticated()
            );

        return http.build();
    }
}