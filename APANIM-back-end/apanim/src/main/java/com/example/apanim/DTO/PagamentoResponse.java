package com.example.apanim.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagamentoResponse {
    private String status; // APROVADO, NEGADO
    private String transactionId; // ID no Gateway
    // ... outros campos

    public void setTransactionId(String string) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public Object getStatus() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
