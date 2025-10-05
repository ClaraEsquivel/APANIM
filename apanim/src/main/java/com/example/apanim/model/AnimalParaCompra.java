package com.example.apanim.model;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tab_animais_compra")
public class AnimalParaCompra extends Animal {

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    public AnimalParaCompra(Long id, String nome, String idadeEstimativa, String raca, String porte, Sexo sexo, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, BigDecimal valorDoAnimal, Boolean pedigree) {
        super(id, nome, idadeEstimativa, raca, porte, sexo, especie, condicaoEspecial, logradouro, bairro, cor, vacinado, vermifugado, castrado, resumo);
        this.valorDoAnimal = valorDoAnimal;
        this.pedigree = pedigree;
    }

    public Boolean getPedigree() {
        return pedigree;
    }

    public void setPedigree(Boolean pedigree) {
        this.pedigree = pedigree;
    }

    public BigDecimal getValorDoAnimal() {
        return valorDoAnimal;
    }

    public void setValorDoAnimal(BigDecimal valorDoAnimal) {
        this.valorDoAnimal = valorDoAnimal;
    }
}