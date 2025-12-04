package com.example.apanim.service;

import com.example.apanim.Enum.StatusAssinatura;
import com.example.apanim.model.Assinatura;
import com.example.apanim.model.Plano;
import com.example.apanim.model.VendedorModel;
import com.example.apanim.repository.AssinaturaRepository;
import com.example.apanim.repository.PlanoRepository;
import com.example.apanim.repository.VendedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AssinaturaService {

    private final AssinaturaRepository assinaturaRepository;
    private final VendedorRepository vendedorRepository;
    private final PlanoRepository planoRepository;
    private final PagamentoService pagamentoService; // Adicionado para cancelamento

    public AssinaturaService(AssinaturaRepository assinaturaRepository,
                             VendedorRepository vendedorRepository,
                             PlanoRepository planoRepository,
                             PagamentoService pagamentoService) { // Adicionado
        this.assinaturaRepository = assinaturaRepository;
        this.vendedorRepository = vendedorRepository;
        this.planoRepository = planoRepository;
        this.pagamentoService = pagamentoService; // Adicionado
    }

    @Transactional
    public Assinatura criarAssinatura(Long vendedorId, Long planoId) {
        VendedorModel vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        Plano plano = planoRepository.findById(planoId)
                .orElseThrow(() -> new IllegalArgumentException("Plano não encontrado."));

        Optional<Assinatura> assinaturaAtiva = 
            assinaturaRepository.findByVendedorIdAndStatus(vendedorId, StatusAssinatura.ATIVA);
        
        if (assinaturaAtiva.isPresent()) {
            throw new IllegalStateException("Usuário já possui uma assinatura ativa.");
        }

        // Se houver uma assinatura PENDENTE antiga, podemos reutilizá-la ou excluí-la
        // Por enquanto, vamos criar uma nova
        
        Assinatura novaAssinatura = new Assinatura();
        novaAssinatura.setVendedor(vendedor);
        novaAssinatura.setPlano(plano);
        novaAssinatura.setStatus(StatusAssinatura.PENDENTE);

        return assinaturaRepository.save(novaAssinatura);
    }

    @Transactional
    public Assinatura ativarAssinatura(Long assinaturaId, String gatewayId) {
        Assinatura assinatura = assinaturaRepository.findById(assinaturaId)
                .orElseThrow(() -> new IllegalArgumentException("Assinatura com ID " + assinaturaId + " não encontrada."));

        // Regra de Negócio: Não re-ativar uma assinatura que já está ATIVA
        if (assinatura.getStatus() == StatusAssinatura.ATIVA) {
            System.out.println("Webhook recebido, mas assinatura " + assinaturaId + " já está ATIVA.");
            return assinatura;
        }

        assinatura.setStatus(StatusAssinatura.ATIVA);
        assinatura.setDataDeExpiracao(LocalDate.now().plusMonths(1)); // Ex: Plano mensal
        assinatura.setGatewaySubscriptionId(gatewayId); // ID do pagamento ou da assinatura recorrente

        return assinaturaRepository.save(assinatura);
    }

    @Transactional
    public Assinatura cancelarAssinatura(Long assinaturaId) {
        Assinatura assinatura = assinaturaRepository.findById(assinaturaId)
                .orElseThrow(() -> new IllegalArgumentException("Assinatura não encontrada."));

        // Se a assinatura tiver um ID de gateway, chama o PagamentoService
        // para cancelar a cobrança recorrente.
        if (assinatura.getGatewaySubscriptionId() != null) {
            pagamentoService.cancelarAssinaturaNoGateway(assinatura.getGatewaySubscriptionId());
        }

        assinatura.setStatus(StatusAssinatura.CANCELADA);
        assinatura.setDataDeExpiracao(LocalDate.now()); // Expira imediatamente

        return assinaturaRepository.save(assinatura);
    }

    public StatusAssinatura getStatusAssinatura(Long vendedorId) {
        Optional<Assinatura> assinatura = assinaturaRepository.findByVendedorId(vendedorId);

        if (assinatura.isEmpty()) {
            return null; 
        }

        Assinatura a = assinatura.get();

        if (a.getStatus() == StatusAssinatura.ATIVA && 
            a.getDataDeExpiracao() != null && // Garante que não é nulo
            a.getDataDeExpiracao().isBefore(LocalDate.now())) {
            
            System.out.println("Assinatura " + a.getId() + " expirada. Atualizando status.");
            a.setStatus(StatusAssinatura.CANCELADA); // Ou INADIMPLENTE
            assinaturaRepository.save(a); // Atualiza o status
        }

        return a.getStatus();
    }

    public void inativarAssinatura(Long idDaAssinatura, String status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'inativarAssinatura'");
    }
}