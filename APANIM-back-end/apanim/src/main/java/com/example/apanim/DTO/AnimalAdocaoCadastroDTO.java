package com.example.apanim.DTO;

import java.util.List;

import org.hibernate.validator.constraints.URL;
import com.example.apanim.Enum.SexoAnimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalAdocaoCadastroDTO extends AnimalCadastroDTO {

    private List<String> vacinas;

    public AnimalAdocaoCadastroDTO() {
    }

    public AnimalAdocaoCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @PositiveOrZero(message = "A idade deve ser 0 ou maior.") Integer idadeEmMeses,
            @NotBlank(message = "A raça é obrigatório.") String raca,
            @NotBlank(message = "O porte é obrigatório.") String porte,
            @NotNull(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal,
            @NotBlank(message = "A espécie é obrigatório.") String especie, String condicaoEspecial,
            @NotBlank(message = "A localização é obrigatória.") String localizacao, @NotBlank String cor,
            @NotNull boolean vacinado, @NotNull boolean vermifugado, @NotNull boolean castrado,
            @Size(max = 100, message = "O resumo não pode exceder 100 caracteres.") String resumo, @URL String fotoUrl,
            @URL String videoUrl, @NotNull Long usuarioId, List<String> vacinas) {
        super(id, nome, idadeEmMeses, raca, porte, sexoAnimal, especie, condicaoEspecial, localizacao, cor, vacinado,
                vermifugado, castrado, resumo, fotoUrl, videoUrl, usuarioId);
        this.vacinas = vacinas;
    }

    public List<String> getVacinas() {
        return vacinas;
    }

    public void setVacinas(List<String> vacinas) {
        this.vacinas = vacinas;
    }
}
