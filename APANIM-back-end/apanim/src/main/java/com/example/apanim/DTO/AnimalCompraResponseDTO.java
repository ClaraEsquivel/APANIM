package com.example.apanim.DTO;

import java.math.BigDecimal;
import java.util.List;

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
    private String localizacao;
    private String cor;
    private Boolean vacinado;
    private List<String> vacinas;
    private Boolean vermifugado;
    private Boolean castrado;
    private String resumo;
    private Long vendedorId;
    private Boolean pedigree;
    private BigDecimal valorDoAnimal;
    private String fotoUrl;
    private String videoUrl;
    private String emailVendedor;
    private List<String> telefoneVendedor;
    
    public AnimalCompraResponseDTO() {
    }

    public AnimalCompraResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao,
            String cor, Boolean vacinado, List<String> vacinas, Boolean vermifugado, Boolean castrado, String resumo,
            Long vendedorId, Boolean pedigree, BigDecimal valorDoAnimal, String fotoUrl, String videoUrl, String emailVendedor,
            List<String> telefoneVendedor) {
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
        this.vacinas = vacinas;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.vendedorId = vendedorId;
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.emailVendedor = emailVendedor;
        this.telefoneVendedor = telefoneVendedor;
    }

}
