package com.example.apanim.DTO;

import java.time.LocalDate;
import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalPerdidoResponseDTO extends AnimalResponseDTO {
    private LocalDate data;
    private List<String> vacinas;
    
    private String emailUsuario;
    private List<String> telefoneUsuario;
    
    public AnimalPerdidoResponseDTO(Long long1, String string, FaixaEtariaAnimal faixaEtariaAnimal, String string2, String string3, SexoAnimal sexoAnimal, String string4, String string5, String string6, String string7, Boolean boolean1, Boolean boolean2, Boolean boolean3, String string8, String string9, String string10, Long long2, LocalDate localDate, List<String> list, String string11, List<String> list2) {
    }

    public AnimalPerdidoResponseDTO(LocalDate data, String emailUsuario, List<String> telefoneUsuario, List<String> vacinas, Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor, boolean vacinado, boolean vermifugado, boolean castrado, String resumo, String fotoUrl, String videoUrl, Long usuarioId) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, localizacao, cor, vacinado, vermifugado, castrado, resumo, fotoUrl, videoUrl, usuarioId);
        this.data = data;
        this.emailUsuario = emailUsuario;
        this.telefoneUsuario = telefoneUsuario;
        this.vacinas = vacinas;
    }

}
