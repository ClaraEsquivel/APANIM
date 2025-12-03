package com.example.apanim.service;

import com.example.apanim.Enum.StatusPagamento;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.model.AnimalCompra;
import com.example.apanim.model.TransacaoAnimal;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.AnimalCompraRepository; 
import com.example.apanim.repository.TransacaoAnimalRepository;
import com.example.apanim.repository.UsuarioRepository; 
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class TransacaoAnimalService {

    private final TransacaoAnimalRepository transacaoRepository;
    private final PagamentoService pagamentoService;
    private final UsuarioRepository usuarioRepository;
    private final AnimalCompraRepository animalCompraRepository;

    public TransacaoAnimalService(TransacaoAnimalRepository transacaoRepository,
                                  PagamentoService pagamentoService,
                                  UsuarioRepository usuarioRepository,
                                  AnimalCompraRepository animalCompraRepository) {
        this.transacaoRepository = transacaoRepository;
        this.pagamentoService = pagamentoService;
        this.usuarioRepository = usuarioRepository;
        this.animalCompraRepository = animalCompraRepository;
    }

    @Transactional
    public PagamentoResponse processarPagamentoCartao(Long animalId, Long usuarioId, PagamentoRequest request) {
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        request.setTransacaoId(transacao.getId());
        
        PagamentoResponse response = pagamentoService.createCreditCardPayment(request);

        if ("APROVADO".equals(response.getStatus())) {
            System.out.println("Animal " + animalId + " vendido e transação APROVADA.");
        }

        return response;
    }

    // --- Fluxo de Pagamento com Boleto ---

    @Transactional
    public BoletoResponse gerarBoleto(Long animalId, Long usuarioId) {
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        BoletoResponse response = pagamentoService.generateBoleto(transacao);

        return response;
    }
    
    // --- Fluxo de Pagamento com Pix ---

    @Transactional
    public PixResponse gerarPix(Long animalId, Long usuarioId) {
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        PixResponse response = pagamentoService.generatePixCharge(transacao);

        return response;
    }

    @Transactional
    private TransacaoAnimal criarTransacao(Long animalId, Long usuarioId) {
        AnimalCompra animal = animalCompraRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        TransacaoAnimal novaTransacao = new TransacaoAnimal();
        novaTransacao.setUsuario(usuario);
        novaTransacao.setAnimal(animal); 
        novaTransacao.setValorTotal(animal.getValorDoAnimal());
        novaTransacao.setStatus(StatusPagamento.PENDENTE); 

        return transacaoRepository.save(novaTransacao);
    }
    
    @Transactional
    public void finalizarTransacaoPorWebhook(String gatewayTransactionId, String status) {
        TransacaoAnimal transacao = transacaoRepository.findByGatewayTransactionId(gatewayTransactionId)
            .orElseThrow(() -> new IllegalArgumentException("Transação de animal não encontrada para o ID do Gateway: " + gatewayTransactionId));

        if ("APROVADO".equalsIgnoreCase(status) && transacao.getStatus() != StatusPagamento.APROVADO) {
            transacao.setStatus(StatusPagamento.APROVADO);
            transacaoRepository.save(transacao);
          
            System.out.println("Transação " + transacao.getId() + " finalizada por Webhook.");

        } else if ("REPROVADO".equalsIgnoreCase(status) && transacao.getStatus() == StatusPagamento.PENDENTE) {
            transacao.setStatus(StatusPagamento.REPROVADO);
            transacaoRepository.save(transacao);
        }
    }
}