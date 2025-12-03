package com.example.apanim.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagamentoRequest {
    @NotBlank // Exemplo de token, nunca o número do cartão
    private String paymentToken; 

    @NotNull
    private BigDecimal amount;

    @NotNull
    private Long orderId; // Para ligar a cobrança à sua entidade Order
    
    // Dados do pagador (CPF, email, etc.)
}
