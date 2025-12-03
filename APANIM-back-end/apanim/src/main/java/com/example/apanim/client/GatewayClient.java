package com.example.apanim.client;

import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.model.TransacaoAnimal;

public interface GatewayClient {
    
    // Processa Cartão de Crédito
    PagamentoResponse processTransaction(PagamentoRequest request); 

    // Gera o código de barras/link para Boleto
    BoletoResponse generateBoletoCharge(TransacaoAnimal transacaoAnimal); 

    // Gera o QR Code e o Copia e Cola para Pix
    PixResponse generatePixCharge(TransacaoAnimal transacaoAnimal); 

    // Cancela uma assinatura recorrente (usado no PagamentoService existente)
    void cancelSubscription(String gatewaySubscriptionId); 
    
    String createSubscriptionLink(Long assinaturaId, String gatewayPlanId);
}