package com.example.apanim.DTO;

import java.time.LocalDate;
import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.Enum.StatusCastracao;
import com.example.apanim.Enum.StatusVermifugacao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalPerdidoResponseDTO extends AnimalResponseDTO {
    private LocalDate data;
    private List<String> vacinas;
    
    private String emailUsuario;
    private List<String> telefoneUsuario;
    
    public AnimalPerdidoResponseDTO(){
        
    }

    public AnimalPerdidoResponseDTO(
            Long id, 
            String nome, 
            FaixaEtariaAnimal faixaEtariaAnimal, 
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
            List<String> vacinas,
            String emailUsuario, 
            List<String> telefoneUsuario) {
        
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, 
              condicaoEspecial, localizacao, cor, statusVacinacao, statusVermifugacao, 
              statusCastracao, resumo, fotoUrl, videoUrl, usuarioId);
        
        this.data = data;
        this.vacinas = vacinas;
        this.emailUsuario = emailUsuario;
        this.telefoneUsuario = telefoneUsuario;
    }


}