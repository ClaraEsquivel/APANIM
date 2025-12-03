package com.example.apanim.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PixResponse {
    private String status;
    private String qrCodeBase64; 
    private String qrCodeText; 
    private String copiaECola; 
    private String transactionId;

    public void setStatus(String pendente) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setTransactionId(String string) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setCopiaECola(String brgovbcbpix) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void setQrCodeText(String dados_do_QR_Code_para_o_Pix) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}