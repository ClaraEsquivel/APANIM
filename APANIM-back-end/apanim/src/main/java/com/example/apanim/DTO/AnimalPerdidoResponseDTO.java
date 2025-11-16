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
    
    public AnimalPerdidoResponseDTO() {
    }

    public AnimalPerdidoResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca,
            String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String bairro, String cor,
            boolean vacinado, boolean vermifugado, boolean castrado, String resumo, String fotoUrl, Long usuarioId,
            LocalDate data, List<String> vacinas, String emailUsuario, List<String> telefoneUsuario) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, bairro, cor, vacinado,
                vermifugado, castrado, resumo, fotoUrl, usuarioId);
        this.data = data;
        this.vacinas = vacinas;
        this.emailUsuario = emailUsuario;
        this.telefoneUsuario = telefoneUsuario;
    }
}
