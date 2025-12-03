package com.example.apanim.client;

import com.example.apanim.DTO.*;
import com.example.apanim.model.TransacaoAnimal;
import org.springframework.stereotype.Component;

// Esta é uma implementação de MOCK. No futuro, você usará o SDK real aqui.
@Component
public class GatewayClientImpl implements GatewayClient {

    @Override
    public PagamentoResponse processTransaction(PagamentoRequest request) {
        // Lógica simulada: 90% de chance de aprovar
        boolean approved = Math.random() < 0.9;
        PagamentoResponse response = new PagamentoResponse();
        response.setStatusPagamento(approved ? "APROVADO" : "REPROVADO");
        response.setTransactionId("TRX-" + System.currentTimeMillis());
        return response;
    }

    @Override
    public BoletoResponse generateBoletoCharge(TransacaoAnimal transacaoAnimal) {
        BoletoResponse response = new BoletoResponse();
        response.setStatus("PENDENTE");
        response.setTransactionId("BOL-" + transacaoAnimal.getId());
        response.setLinhaDigitavel("34191.09008 00001.000000 00001.000000 9 00000000000000"); // Mock
        response.setBoletoUrl("http://mockgateway.com/boleto/" + transacaoAnimal.getId());
        return response;
    }

    @Override
    public PixResponse generatePixCharge(TransacaoAnimal transacaoAnimal) {
        PixResponse response = new PixResponse();
        response.setStatus("PENDENTE");
        response.setTransactionId("PIX-" + transacaoAnimal.getId());
        response.setCopiaECola("00020126330014BR.GOV.BCB.PIX..."); // Mock
        response.setQrCodeText("Dados do QR Code para o Pix");
        return response;
    }

    @Override
    public void cancelSubscription(String gatewaySubscriptionId) {
        System.out.println("Cancelamento simulado da assinatura: " + gatewaySubscriptionId);
    }

    @Override
    public String createSubscriptionLink(Long assinaturaId, String gatewayPlanId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createSubscriptionLink'");
    }
}