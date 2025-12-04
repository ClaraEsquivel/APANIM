package com.example.apanim.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagamentoRequest {
    @NotBlank 
    private String paymentToken; 

    @NotNull
    private BigDecimal amount;

    @NotNull
    private Long transacaoId; 
    
}
