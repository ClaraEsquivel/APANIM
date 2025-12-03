package com.example.apanim.service;

import com.example.apanim.Enum.StatusPagamento; // Necessário para atualização
import com.example.apanim.client.GatewayClient;
import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.model.Assinatura;
import com.example.apanim.model.TransacaoAnimal;
import com.example.apanim.repository.TransacaoAnimalRepository; // NOVO: Repositório
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Adicionar para métodos que salvam

@Service
public class PagamentoService {
    
    private final GatewayClient gatewayClient; 
    private final TransacaoAnimalRepository transacaoAnimalRepository; // NOVO

    // Construtor com as duas injeções de dependência
    public PagamentoService(GatewayClient gatewayClient, TransacaoAnimalRepository transacaoAnimalRepository) {
        this.gatewayClient = gatewayClient;
        this.transacaoAnimalRepository = transacaoAnimalRepository;
    }

    // --- Métodos de Venda/Transação (Cartão, Boleto, Pix) ---

    @Transactional // Garante que a transação no DB seja atômica
    public PagamentoResponse createCreditCardPayment(PagamentoRequest request) {
        
        // 1. Chamar a função de transação do GatewayClient.
        PagamentoResponse response = gatewayClient.processTransaction(request);
        
        // 2. Salvar o ID da transação e o status no seu BD.
        TransacaoAnimal transacao = transacaoAnimalRepository.findById(request.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Transação não encontrada para o ID: " + request.getOrderId()));
        
        // Atualiza o status e o ID do gateway, baseado na resposta (APROVADO/REPROVADO)
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
        // 1. Chamar a função de geração de boleto do GatewayClient.
        BoletoResponse response = gatewayClient.generateBoletoCharge(transacaoAnimal);
        
        // 2. Salvar o ID da transação do Gateway
        transacaoAnimal.setGatewayTransactionId(response.getTransactionId());
        // O status deve permanecer PENDENTE
        
        transacaoAnimalRepository.save(transacaoAnimal);
        
        return response; // Retorna o link para o Boleto e a Linha Digitável.
    }

    @Transactional
    public PixResponse generatePixCharge(TransacaoAnimal transacaoAnimal) {
        // 1. Chamar a função de criação de Pix (BR Code) do GatewayClient.
        PixResponse response = gatewayClient.generatePixCharge(transacaoAnimal);
        
        // 2. Salvar o ID da cobrança e o código de vencimento no banco de dados.
        transacaoAnimal.setGatewayTransactionId(response.getTransactionId());
        // O status deve permanecer PENDENTE
        
        transacaoAnimalRepository.save(transacaoAnimal);
        
        return response; // Retorna o QR Code (texto) e o Código Copia e Cola.
    }

    // --- Métodos de Assinatura (Adaptação) ---
    
    // ... criarLinkDePagamento e cancelarAssinaturaNoGateway permanecem iguais.

    public String criarLinkDePagamento(Assinatura assinatura) {
        // ... (lógica anterior)
        return "https://gateway.com/pagar/assinatura-pix-ou-cartao-12345";
    }

    public void cancelarAssinaturaNoGateway(String gatewaySubscriptionId) {
        // ... (lógica anterior)
        gatewayClient.cancelSubscription(gatewaySubscriptionId);
        System.out.println("Cancelando assinatura " + gatewaySubscriptionId + " no gateway.");
    }
}