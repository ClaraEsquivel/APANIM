package com.example.apanim.DTO;

import java.math.BigDecimal;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalCompraCadastroDTO {
    
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotNull(message = "A faixa etária é obrigatória.")
    private FaixaEtariaAnimal faixaEtariaAnimal;

    @NotBlank(message = "A raça é obrigatória.")
    private String raca;

    @NotBlank(message = "O porte é obrigatório.")
    private String porte;

    @NotNull(message = "O sexo é obrigatório.")
    private SexoAnimal sexoAnimal;

    @NotBlank(message = "A espécie é obrigatória.")
    private String especie;

    @NotBlank
    private String condicaoEspecial;

    private String logradouro;

    @NotBlank(message = "O bairro é obrigatório.")
    private String bairro;

    @NotBlank
    private String cor;

    @NotNull
    private Boolean vacinado;
    
    @NotNull
    private Boolean vermifugado;
    
    @NotNull
    private Boolean castrado;

    @Lob
    private String resumo;

    @NotNull
    private Long vendedorId;

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    public AnimalCompraCadastroDTO() {
    }

    public AnimalCompraCadastroDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro,
            String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, Boolean pedigree,
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
