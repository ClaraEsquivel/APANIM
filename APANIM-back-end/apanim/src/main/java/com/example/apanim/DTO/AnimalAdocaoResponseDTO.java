package com.example.apanim.DTO;

import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalAdocaoResponseDTO extends AnimalResponseDTO {
   
    private List<String> vacinas;
    private String emailUsuario;
    private List<String> telefoneUsuario;

    public AnimalAdocaoResponseDTO() {
    }

    public AnimalAdocaoResponseDTO(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            boolean vacinado, boolean vermifugado, boolean castrado, String resumo, String fotoUrl, String videoUrl,
            Long usuarioId, List<String> vacinas, String emailUsuario, List<String> telefoneUsuario) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, localizacao, cor,
                vacinado, vermifugado, castrado, resumo, fotoUrl, videoUrl, usuarioId);
        this.vacinas = vacinas;
        this.emailUsuario = emailUsuario;
        this.telefoneUsuario = telefoneUsuario;
    }

}
