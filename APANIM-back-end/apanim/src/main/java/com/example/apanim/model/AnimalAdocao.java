package com.example.apanim.model;
import java.time.LocalDate;
import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusVermifugacao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tab_animais_adocao")
@Inheritance(strategy = InheritanceType.JOINED)
public class AnimalAdocao extends AnimalModel {

    @ElementCollection
    @CollectionTable(name = "tab_animal_adocao_vacinas",
                    joinColumns = @JoinColumn(name = "animal_adocao_id"))
    @Column(name = "vacina")
    private List<String> vacinas;

    public AnimalAdocao() {
    }

    public AnimalAdocao(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            String resumo, String fotoUrl, String videoUrl, UsuarioModel usuario, LocalDate data, 
            List<String> vacinas, StatusVacinacao statusVacinacao, StatusCastracao statusCastracao, 
            StatusVermifugacao statusVermifugacao) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, localizacao, cor, statusVacinacao, statusCastracao, statusVermifugacao, 
                resumo, fotoUrl, videoUrl, usuario);
        this.vacinas = vacinas;
    }

    public List<String> getVacinas() {
        return vacinas;
    }

    public void setVacinas(List<String> vacinas) {
        this.vacinas = vacinas;
    }
}