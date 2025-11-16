package com.example.apanim.DTO;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.validator.constraints.URL;

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
    
    private List<String> vacinas;

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

    @URL
    @NotBlank
    private String fotoUrl;

    public AnimalCompraCadastroDTO() {
    }

    public AnimalCompraCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @NotNull(message = "A faixa etária é obrigatória.") FaixaEtariaAnimal faixaEtariaAnimal,
            @NotBlank(message = "A raça é obrigatória.") String raca,
            @NotBlank(message = "O porte é obrigatório.") String porte,
            @NotNull(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal,
            @NotBlank(message = "A espécie é obrigatória.") String especie, @NotBlank String condicaoEspecial,
            String logradouro, @NotBlank(message = "O bairro é obrigatório.") String bairro, @NotBlank String cor,
            @NotNull Boolean vacinado, List<String> vacinas, @NotNull Boolean vermifugado, @NotNull Boolean castrado,
            String resumo, @NotNull Long vendedorId, Boolean pedigree, BigDecimal valorDoAnimal,
            @URL @NotBlank String fotoUrl) {
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
        this.vacinas = vacinas;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.vendedorId = vendedorId;
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
        this.fotoUrl = fotoUrl;
    }

    
}
