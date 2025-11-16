package com.example.apanim.model;
import java.util.List;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
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
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String bairro, String cor, Boolean vacinado,
            Boolean vermifugado, Boolean castrado, String resumo, String fotoUrl, UsuarioModel usuario,
            List<String> vacinas) {
        super(id, nome, faixaEtariaAnimal, raca, porte, sexoAnimal, especie, condicaoEspecial, bairro, cor, vacinado,
                vermifugado, castrado, resumo, fotoUrl, usuario);
        this.vacinas = vacinas;
    }

    
}