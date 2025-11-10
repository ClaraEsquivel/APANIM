package com.example.apanim.DTO;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalResponseDTO {
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
    private boolean vacinado;
    private boolean vermifugado;
    private boolean castrado;
    private String resumo;
    private Long usuarioId;

    public AnimalResponseDTO() {
    }

    public AnimalResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, boolean vacinado, boolean vermifugado, boolean castrado, String resumo, Long usuarioId) {
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
        this.usuarioId = usuarioId;
    }

}
