package com.example.apanim.model;

import java.time.LocalDate;
import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusVermifugacao;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tab_animais_perdidos")
public class AnimalPerdido extends AnimalModel {

    private LocalDate data;

    @ElementCollection
    @CollectionTable(name = "tab_animal_perdido_vacinas",
                    joinColumns = @JoinColumn(name = "animal_perdido_id"))
    @Column(name = "vacina")
    private List<String> vacinas;

    public AnimalPerdido() {
    }

    public AnimalPerdido(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            String resumo, String fotoUrl, String videoUrl, UsuarioModel usuario, LocalDate data, 
            List<String> vacinas, StatusVacinacao statusVacinacao, StatusCastracao statusCastracao, 
            StatusVermifugacao statusVermifugacao) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, localizacao, cor, statusVacinacao, statusCastracao, statusVermifugacao, 
                resumo, fotoUrl, videoUrl, usuario);
        this.data = data;
        this.vacinas = vacinas;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public List<String> getVacinas() {
        return vacinas;
    }

    public void setVacinas(List<String> vacinas) {
        this.vacinas = vacinas;
    }
}
