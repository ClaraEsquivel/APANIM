package com.example.apanim.model;

import com.example.apanim.Enum.StatusAssinatura;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tab_assinaturas")
public class Assinatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // A ligação com o usuário que fez a assinatura
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    // A ligação com o plano que foi assinado
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plano_id", nullable = false)
    private Plano plano;

    // O status da assinatura (ATIVA, PENDENTE, CANCELADA)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAssinatura status;

    // A data em que a assinatura expira (útil para planos mensais)
    private LocalDate dataDeExpiracao;

    // O ID da assinatura lá no Gateway de Pagamento (Mercado Pago, Stripe)
    @Column(unique = true)
    private String gatewaySubscriptionId;

    public Assinatura() {
    }

    public Assinatura(UsuarioModel usuario, Plano plano, StatusAssinatura status, LocalDate dataDeExpiracao,
            String gatewaySubscriptionId) {
        this.usuario = usuario;
        this.plano = plano;
        this.status = status;
        this.dataDeExpiracao = dataDeExpiracao;
        this.gatewaySubscriptionId = gatewaySubscriptionId;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public Plano getPlano() {
        return plano;
    }

    public StatusAssinatura getStatus() {
        return status;
    }

    public LocalDate getDataDeExpiracao() {
        return dataDeExpiracao;
    }

    public String getGatewaySubscriptionId() {
        return gatewaySubscriptionId;
    }

    // Setters
    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    public void setPlano(Plano plano) {
        this.plano = plano;
    }

    public void setStatus(StatusAssinatura status) {
        this.status = status;
    }

    public void setDataDeExpiracao(LocalDate dataDeExpiracao) {
        this.dataDeExpiracao = dataDeExpiracao;
    }

    public void setGatewaySubscriptionId(String gatewaySubscriptionId) {
        this.gatewaySubscriptionId = gatewaySubscriptionId;
    }
}