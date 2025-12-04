package com.example.apanim.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssinaturaRequestDTO {
    @NotNull
    private Long vendedorId; 
    
    @NotNull
    private Long planoId;

    public Long getVendedorId() {
        return vendedorId;
    }

    public void setVendedorId(Long vendedorId) {
        this.vendedorId = vendedorId;
    }

    public Long getPlanoId() {
        return planoId;
    }

    public void setPlanoId(Long planoId) {
        this.planoId = planoId;
    }
}