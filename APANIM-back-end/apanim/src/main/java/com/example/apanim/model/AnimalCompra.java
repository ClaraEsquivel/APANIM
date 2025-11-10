package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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
    private String logradouro;
    private String bairro;
    private String cor;
    private Boolean vacinado;
    private Boolean vermifugado;
    private Boolean castrado;
    private String resumo;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "vendedor_id", nullable = false)
    private VendedorModel vendedor;

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    public AnimalCompra() {
    }

    public AnimalCompra(
        Long id, 
        String nome, 
        FaixaEtariaAnimal faixaEtariaAnimal, 
        String raca, 
        String porte,
        SexoAnimal sexoAnimal, 
        String especie, 
        String condicaoEspecial, 
        String logradouro, 
        String bairro,
        String cor, 
        Boolean vacinado, 
        Boolean vermifugado, 
        Boolean castrado, 
        String resumo, 
        Boolean pedigree,
        BigDecimal valorDoAnimal) {

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
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
    }

}