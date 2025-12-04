package com.example.apanim.DTO;

import com.example.apanim.model.Plano;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class PlanoResponseDTO {
    private Long id;
    private String nome;
    private BigDecimal preco;
    private String descricao;

    public PlanoResponseDTO(Plano plano) {
        this.id = plano.getId();
        this.nome = plano.getNome();
        this.preco = plano.getPreco();
        this.descricao = plano.getDescricao();
    }
}