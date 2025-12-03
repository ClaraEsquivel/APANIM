package com.example.apanim.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "tab_boosts")
public class Boost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(nullable = false)
    private Integer duracaoDias; 

    @Column(nullable = false)
    private BigDecimal preco; 

    private String descricao; 

    private String gatewayProductId; 

    public Boost() {
    }

    public Boost(String nome, Integer duracaoDias, BigDecimal preco, String descricao, String gatewayProductId) {
        this.nome = nome;
        this.duracaoDias = duracaoDias;
        this.preco = preco;
        this.descricao = descricao;
        this.gatewayProductId = gatewayProductId;
    }

}