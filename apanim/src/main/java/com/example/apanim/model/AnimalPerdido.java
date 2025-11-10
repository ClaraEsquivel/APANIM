package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "tab_animais_perdidos")
public class AnimalPerdido extends AnimalModel {

    private LocalDate data;
    private String localDaUltimaAparicao;
    private String contato;

    public AnimalPerdido() {
    }

    public AnimalPerdido(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, LocalDate data, String localDaUltimaAparicao, String contato) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, logradouro, bairro, cor, vacinado, vermifugado, castrado, resumo);
        this.data = data;
        this.localDaUltimaAparicao = localDaUltimaAparicao;
        this.contato = contato;
    }

}
