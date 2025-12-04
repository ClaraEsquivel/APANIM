package com.example.apanim.DTO;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
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
    private boolean vacinado;
    private boolean vermifugado;
    private boolean castrado;
    private String resumo;
    private String fotoUrl;
    private String videoUrl;
    private Long usuarioId;

    public AnimalResponseDTO() {
    }

    public AnimalResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            boolean vacinado, boolean vermifugado, boolean castrado, String resumo, String fotoUrl, String videoUrl,
            Long usuarioId) {
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
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.usuarioId = usuarioId;
    }

   
}
