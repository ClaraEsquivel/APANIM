package com.example.apanim.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoletoResponse {
    private String status;
    private String boletoUrl; // Link para o PDF
    private String linhaDigitavel; 
    private String transactionId;

    public void setStatus(String pendente) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setTransactionId(String string) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setLinhaDigitavel(String _00001000000_00001000000_9_00000000000000) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setBoletoUrl(String string) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}