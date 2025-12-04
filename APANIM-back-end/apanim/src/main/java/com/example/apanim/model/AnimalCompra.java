package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusVermifugacao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "tab_animais_compra")
public class AnimalCompra {

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
    @Column(name = "status_vermifugacao")
    private StatusVermifugacao statusVermifugacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_castracao")
    private StatusCastracao statusCastracao;

    @Column(length = 100)
    private String resumo;

    @ElementCollection
    @CollectionTable(name = "tab_animal_compra_vacinas",
                    joinColumns = @JoinColumn(name = "animal_compra_id"))
    @Column(name = "vacina")
    private List<String> vacinas;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "vendedor_id", nullable = false)
    private VendedorModel vendedor;

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    @Column(length = 1024)
    private String fotoUrl;
    
    @Column(length = 1024)
    private String videoUrl;

    public AnimalCompra() {
    }
    
    public AnimalCompra(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao,
            String cor, StatusVacinacao statusVacinacao,  StatusVermifugacao statusVermifugacao, StatusCastracao statusCastracao, String resumo, List<String> vacinas,
            VendedorModel vendedor, Boolean pedigree, BigDecimal valorDoAnimal, String fotoUrl, String videoUrl) {
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
        this.statusVermifugacao = statusVermifugacao;
        this.statusCastracao = statusCastracao;
        this.resumo = resumo;
        this.vacinas = vacinas;
        this.vendedor = vendedor;
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
    }

}