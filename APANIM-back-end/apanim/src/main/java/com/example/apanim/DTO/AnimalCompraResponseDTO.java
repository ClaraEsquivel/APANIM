package com.example.apanim.DTO;

import java.math.BigDecimal;
import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalCompraResponseDTO {
    
    private Long id;
    private String nome;
    private FaixaEtariaAnimal faixaEtariaAnimal;
    private String raca;
    private String porte;
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
    private Long vendedorId;
    private Boolean pedigree;
    private BigDecimal valorDoAnimal;
    
    public AnimalCompraResponseDTO() {
    }

    public AnimalCompraResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro,
            String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, Long vendedorId,
            Boolean pedigree, BigDecimal valorDoAnimal) {
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
        this.vendedorId = vendedorId;
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
    }


}
