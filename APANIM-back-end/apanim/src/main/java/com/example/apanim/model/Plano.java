package com.example.apanim.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "tab_planos")
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome; // Ex: "Plano Profissional" ou "Anúncio Premium"

    @Column(nullable = false)
    private BigDecimal preco; // Ex: 199.99 ou 29.90

    private String descricao; // Ex: "todos benefícios + destaque permanente"

    // Este é o ID que o Mercado Pago ou Stripe usa para identificar este plano
    private String gatewayPlanId; 

    public Plano() {
    }

    public Plano(String nome, BigDecimal preco, String descricao, String gatewayPlanId) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.gatewayPlanId = gatewayPlanId;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getGatewayPlanId() {
        return gatewayPlanId;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setGatewayPlanId(String gatewayPlanId) {
        this.gatewayPlanId = gatewayPlanId;
    }
}