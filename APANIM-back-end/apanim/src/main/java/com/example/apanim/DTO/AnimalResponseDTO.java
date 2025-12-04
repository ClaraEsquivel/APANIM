package com.example.apanim.DTO;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVermifugacao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AnimalResponseDTO {
    private Long id;
    private String nome;
    private FaixaEtariaAnimal faixaEtariaAnimal;
    private String raca;
    private String porte;
    private SexoAnimal sexoAnimal;
    private String especie;
    private String condicaoEspecial;
    private String localizacao;
    private String cor;
    private StatusVacinacao statusVacinacao;
    private StatusVermifugacao statusVermifugacao;
    private StatusCastracao statusCastracao;
    private String resumo;
    private String fotoUrl;
    private String videoUrl;
    private Long usuarioId;

    public AnimalResponseDTO() {
    }

    public AnimalResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            StatusVacinacao statusVacinacao, StatusVermifugacao statusVermifugacao, StatusCastracao statusCastracao, String resumo, 
            String fotoUrl, String videoUrl, Long usuarioId) {
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
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.usuarioId = usuarioId;
    }
}