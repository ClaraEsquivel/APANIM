package com.example.apanim.model;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tab_animais")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String idadeEstimativa;

    private String raca;

    private String porte;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private String especie;

    private String condicaoEspecial;

    private String logradouro;

    private String bairro;

    private String cor;

    @NotNull
    private Boolean vacinado;

    @NotNull
    private Boolean vermifugado;

    @NotNull
    private Boolean castrado;

    @Lob
    private String resumo;

    // Getters e Setters
}