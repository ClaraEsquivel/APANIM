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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private VendedorModel vendedor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plano_id", nullable = false)
    private Plano plano;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAssinatura status;

    private LocalDate dataDeExpiracao;

    @Column(unique = true)
    private String gatewaySubscriptionId;

    public Assinatura() {
    }

    public Assinatura(VendedorModel vendedor, Plano plano, StatusAssinatura status, LocalDate dataDeExpiracao,
            String gatewaySubscriptionId) {
        this.vendedor = vendedor;
        this.plano = plano;
        this.status = status;
        this.dataDeExpiracao = dataDeExpiracao;
        this.gatewaySubscriptionId = gatewaySubscriptionId;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public VendedorModel getVendedor() {
        return vendedor;
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
    public void setVendedor(VendedorModel vendedor) {
        this.vendedor = vendedor;
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