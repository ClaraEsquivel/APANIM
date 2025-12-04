package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusVermifugacao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class AnimalModel {

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
    private String localizacao;
    private String cor;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status_vacinacao")
    private StatusVacinacao statusVacinacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_castracao")
    private StatusCastracao statusCastracao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_vermifugacao")
    private StatusVermifugacao statusVermifugacao;

    @Column(length = 100)
    private String resumo;

    @Column(length = 1024)
    private String fotoUrl;
    
    @Column(length = 1024)
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    public AnimalModel() {
    }

    public AnimalModel(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            StatusVacinacao statusVacinacao, StatusCastracao statusCastracao, StatusVermifugacao statusVermifugacao,
            String resumo, String fotoUrl, String videoUrl, UsuarioModel usuario) {
        this.id = id;
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.localizacao = localizacao;
        this.cor = cor;
        this.statusVacinacao = statusVacinacao;
        this.statusCastracao = statusCastracao;
        this.statusVermifugacao = statusVermifugacao;
        this.resumo = resumo;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.usuario = usuario;
    }

    
}