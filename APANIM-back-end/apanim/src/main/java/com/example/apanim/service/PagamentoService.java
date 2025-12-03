package com.example.apanim.service;

import com.example.apanim.Enum.StatusPagamento; 
import com.example.apanim.client.GatewayClient;
import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.model.Assinatura;
import com.example.apanim.model.TransacaoAnimal;
import com.example.apanim.repository.TransacaoAnimalRepository; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; 

@Service
public class PagamentoService {
    
    private final GatewayClient gatewayClient; 
    private final TransacaoAnimalRepository transacaoAnimalRepository; 

    public PagamentoService(GatewayClient gatewayClient, TransacaoAnimalRepository transacaoAnimalRepository) {
        this.gatewayClient = gatewayClient;
        this.transacaoAnimalRepository = transacaoAnimalRepository;
    }

    @Transactional 
    public PagamentoResponse createCreditCardPayment(PagamentoRequest request) {
        
        PagamentoResponse response = gatewayClient.processTransaction(request);
        
        TransacaoAnimal transacao = transacaoAnimalRepository.findById(request.getTransacaoId())
                .orElseThrow(() -> new IllegalArgumentException("Transação não encontrada para o ID: " + request.getTransacaoId()));
        
        transacao.setGatewayTransactionId(response.getTransactionId());
        
        if ("APROVADO".equals(response.getStatus())) {
            transacao.setStatus(StatusPagamento.APROVADO);
        } else if ("REPROVADO".equals(response.getStatus())) {
            transacao.setStatus(StatusPagamento.REPROVADO);
        }
        
        transacaoAnimalRepository.save(transacao);
        
        return response;
    }

    @Transactional
    public BoletoResponse generateBoleto(TransacaoAnimal transacaoAnimal) {
        BoletoResponse response = gatewayClient.generateBoletoCharge(transacaoAnimal);
        
        transacaoAnimal.setGatewayTransactionId(response.getTransactionId());
        
        transacaoAnimalRepository.save(transacaoAnimal);
        
        return response;
    }

    @Transactional
    public PixResponse generatePixCharge(TransacaoAnimal transacaoAnimal) {
        PixResponse response = gatewayClient.generatePixCharge(transacaoAnimal);
        
        transacaoAnimal.setGatewayTransactionId(response.getTransactionId());
        
        transacaoAnimalRepository.save(transacaoAnimal);
        
        return response; 
    }

    public String criarLinkDePagamento(Assinatura assinatura) {
        return "https://gateway.com/pagar/assinatura-pix-ou-cartao-12345";
    }

    public void cancelarAssinaturaNoGateway(String gatewaySubscriptionId) {
        gatewayClient.cancelSubscription(gatewaySubscriptionId);
        System.out.println("Cancelando assinatura " + gatewaySubscriptionId + " no gateway.");
    }
}