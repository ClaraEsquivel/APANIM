package com.example.apanim.DTO;

import com.example.apanim.model.Boost;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class BoostResponseDTO {
    private Long id;
    private String nome;
    private Integer duracaoDias;
    private BigDecimal preco;
    private String descricao;

    public BoostResponseDTO() {
    }

    public BoostResponseDTO(Boost boost) {
        this.id = boost.getId();
        this.nome = boost.getNome();
        this.duracaoDias = boost.getDuracaoDias();
        this.preco = boost.getPreco();
        this.descricao = boost.getDescricao();
    }

}