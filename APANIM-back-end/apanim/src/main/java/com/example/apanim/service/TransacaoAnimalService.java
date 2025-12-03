package com.example.apanim.service;

import com.example.apanim.Enum.StatusPagamento;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.model.AnimalCompra;
import com.example.apanim.model.TransacaoAnimal;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.AnimalCompraRepository; // Presumido
import com.example.apanim.repository.TransacaoAnimalRepository;
import com.example.apanim.repository.UsuarioRepository; // Presumido
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

    // --- Fluxo de Pagamento com Cartão ---
    
    @Transactional
    public PagamentoResponse processarPagamentoCartao(Long animalId, Long usuarioId, PagamentoRequest request) {
        // 1. Cria a Transação no DB com status PENDENTE
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        // 2. Adapta o Request para a Transação criada
        request.setOrderId(transacao.getId());
        
        // 3. Chama o PagamentoService para processar o Cartão
        // O PagamentoService (já adaptado) se encarrega de atualizar o status no DB.
        PagamentoResponse response = pagamentoService.createCreditCardPayment(request);

        // 4. Lógica de Pós-Pagamento (Ex: Baixa no Estoque)
        if ("APROVADO".equals(response.getStatus())) {
            // Se aprovado, marque o animal como 'vendido' ou remova-o do estoque
            // Exemplo: animalCompraRepository.marcarComoVendido(animalId);
            System.out.println("Animal " + animalId + " vendido e transação APROVADA.");
        }

        return response;
    }

    // --- Fluxo de Pagamento com Boleto ---

    @Transactional
    public BoletoResponse gerarBoleto(Long animalId, Long usuarioId) {
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        // O PagamentoService gera o boleto e atualiza o ID da transação no DB
        BoletoResponse response = pagamentoService.generateBoleto(transacao);

        return response;
    }
    
    // --- Fluxo de Pagamento com Pix ---

    @Transactional
    public PixResponse gerarPix(Long animalId, Long usuarioId) {
        TransacaoAnimal transacao = criarTransacao(animalId, usuarioId);

        // O PagamentoService gera o Pix e atualiza o ID da transação no DB
        PixResponse response = pagamentoService.generatePixCharge(transacao);

        return response;
    }

    // --- Método Auxiliar: Cria Transação Inicial ---

    @Transactional
    private TransacaoAnimal criarTransacao(Long animalId, Long usuarioId) {
        AnimalCompra animal = animalCompraRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        // Regra de Negócio: Verificação se o animal já foi vendido
        // if (animal.getStatusVenda() == VENDIDO) { throw... }

        TransacaoAnimal novaTransacao = new TransacaoAnimal();
        novaTransacao.setUsuario(usuario);
        novaTransacao.setAnimal(animal); // Adicionado o campo 'animal' (lembre de adicioná-lo na entidade!)
        novaTransacao.setValorTotal(animal.getValorDoAnimal());
        novaTransacao.setStatus(StatusPagamento.PENDENTE); // Começa sempre como pendente

        return transacaoRepository.save(novaTransacao);
    }
    
    // --- Lógica para Webhook de Pagamento (Avulso) ---

    @Transactional
    public void finalizarTransacaoPorWebhook(String gatewayTransactionId, String status) {
        TransacaoAnimal transacao = transacaoRepository.findByGatewayTransactionId(gatewayTransactionId)
            .orElseThrow(() -> new IllegalArgumentException("Transação de animal não encontrada para o ID do Gateway: " + gatewayTransactionId));

        if ("APROVADO".equalsIgnoreCase(status) && transacao.getStatus() != StatusPagamento.APROVADO) {
            transacao.setStatus(StatusPagamento.APROVADO);
            transacaoRepository.save(transacao);
            
            // Lógica de Pós-Pagamento
            // animalCompraRepository.marcarComoVendido(transacao.getAnimal().getId());
            System.out.println("Transação " + transacao.getId() + " finalizada por Webhook.");

        } else if ("REPROVADO".equalsIgnoreCase(status) && transacao.getStatus() == StatusPagamento.PENDENTE) {
            transacao.setStatus(StatusPagamento.REPROVADO);
            transacaoRepository.save(transacao);
            // Lógica de Re-estoque (se aplicável)
        }
    }
}