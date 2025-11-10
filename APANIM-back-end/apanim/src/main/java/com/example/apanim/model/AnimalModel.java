package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tab-animais")
@Inheritance(strategy = InheritanceType.JOINED)
public class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private FaixaEtariaAnimal faixaEtariaAnimal;

    private String raca;
    private String porte;

    @Enumerated(EnumType.STRING)
    private SexoAnimal sexoAnimal;

    private String especie;
    private String condicaoEspecial;
    private String logradouro;
    private String bairro;
    private String cor;
    private Boolean vacinado;
    private Boolean vermifugado;
    private Boolean castrado;

    @Lob
    private String resumo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    public AnimalModel() {
    }

    public AnimalModel(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo) {
        this.id = id;
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cor = cor;
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
    }

}