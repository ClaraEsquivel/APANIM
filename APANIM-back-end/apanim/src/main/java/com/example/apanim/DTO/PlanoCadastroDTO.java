package com.example.apanim.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class PlanoCadastroDTO {
    @NotBlank
    private String nome;

    @NotNull
    @Positive
    private BigDecimal preco;

    private String descricao;
    
    private String gatewayPlanId;
}