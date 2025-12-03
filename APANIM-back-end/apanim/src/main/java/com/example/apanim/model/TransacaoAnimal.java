package com.example.apanim.model;

import java.math.BigDecimal;

import com.example.apanim.Enum.StatusPagamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tab_transacao")
public class TransacaoAnimal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // A ligação com o usuário que está comprando
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false) // Ligação com o animal vendido
    private AnimalCompra animal;
    
    // O valor total da venda
    @Column(nullable = false)
    private BigDecimal valorTotal; 

    // O status do pagamento desta transação (ex: PENDENTE, APROVADO, REPROVADO)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPagamento status; // Você precisará criar o Enum StatusPagamento

    // O ID da transação no Gateway (para Pix e Boleto)
    @Column(unique = true)
    private String gatewayTransactionId; 

}
