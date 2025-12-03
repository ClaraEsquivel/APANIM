package com.example.apanim.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagamentoResponse {
    private String statusPagamento; 
    private String transactionId; 

    public void setTransactionId(String string) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public Object getStatus() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
