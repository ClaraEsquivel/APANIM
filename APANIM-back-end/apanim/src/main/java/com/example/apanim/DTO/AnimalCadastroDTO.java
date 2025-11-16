package com.example.apanim.DTO;

import org.hibernate.validator.constraints.URL;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AnimalCadastroDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotNull(message = "A Faixa Etária é obrigatório.")
    private FaixaEtariaAnimal faixaEtariaAnimal;

    @NotBlank(message = "A raça é obrigatório.")
    private String raca;

    @NotBlank(message = "O porte é obrigatório.")
    private String porte;

    @NotNull(message = "O sexo é obrigatório.")
    private SexoAnimal sexoAnimal;

    @NotBlank(message = "A espécie é obrigatório.")
    private String especie;

    @NotBlank
    private String condicaoEspecial;

    @NotBlank(message = "O bairro é obrigatório.")
    private String bairro;

    @NotBlank
    private String cor;

    @NotNull
    private boolean vacinado;

    @NotNull
    private boolean vermifugado;

    @NotNull
    private boolean castrado;
    
    private String resumo;

    @URL
    @NotBlank
    private String fotoUrl;

    @NotNull 
    private Long usuarioId;

    public AnimalCadastroDTO() {
    }

    public AnimalCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @NotNull(message = "A Faixa Etária é obrigatório.") FaixaEtariaAnimal faixaEtariaAnimal,
            @NotBlank(message = "A raça é obrigatório.") String raca,
            @NotBlank(message = "O porte é obrigatório.") String porte,
            @NotNull(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal,
            @NotBlank(message = "A espécie é obrigatório.") String especie, @NotBlank String condicaoEspecial,
            @NotBlank(message = "O bairro é obrigatório.") String bairro, @NotBlank String cor,
            @NotNull boolean vacinado, @NotNull boolean vermifugado, @NotNull boolean castrado, String resumo,
            @URL @NotBlank String fotoUrl, @NotNull Long usuarioId) {
        this.id = id;
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.bairro = bairro;
        this.cor = cor;
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.fotoUrl = fotoUrl;
        this.usuarioId = usuarioId;
    }

    
}
