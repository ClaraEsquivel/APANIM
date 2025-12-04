package com.example.apanim.DTO;

import java.time.LocalDate;
import java.util.List;

import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusVermifugacao;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotNull;

public class AnimalPerdidoCadastroDTO extends AnimalCadastroDTO {

    @NotNull(message = "A data é obrigatória")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate data;

    private List<String> vacinas;

    public AnimalPerdidoCadastroDTO() {
    }

    public AnimalPerdidoCadastroDTO(
            Long id, 
            String nome, 
            Integer idadeEmMeses, 
            String raca, 
            String porte,
            SexoAnimal sexoAnimal, 
            String especie, 
            String condicaoEspecial, 
            String localizacao, 
            String cor,
            StatusVacinacao statusVacinacao, 
            StatusVermifugacao statusVermifugacao, 
            StatusCastracao statusCastracao,
            String resumo, 
            String fotoUrl, 
            String videoUrl, 
            Long usuarioId,
            LocalDate data, 
            List<String> vacinas) {
        super(id, nome, idadeEmMeses, raca, porte, sexoAnimal, especie, condicaoEspecial, 
              localizacao, cor, statusVacinacao, statusVermifugacao, statusCastracao, 
              resumo, fotoUrl, videoUrl, usuarioId);
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