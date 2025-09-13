package com.example.apanim.model;

import com.example.apanim.Enum.PlanoAssinatura;
import com.example.apanim.Enum.TipoUsuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tab_usuarios")
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    @Column(unique = true)
    private String cpf;

    @Column(unique = true)
    private String cnpj;

    @NotNull
    private Integer idade;

    @NotBlank
    private String telefone;

    @NotBlank
    private String email;

    @NotBlank
    private String senha;

    @NotBlank
    private String cep;

    @NotBlank
    private String logradouro;

    @NotBlank
    private String bairro;

    @Enumerated(EnumType.STRING)
    private PlanoAssinatura planoAssinatura;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    // Getters e Setters...
}