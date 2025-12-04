package com.example.apanim.controller;

import com.example.apanim.DTO.NotificacaoDoGateway;
import com.example.apanim.service.AssinaturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    private final AssinaturaService assinaturaService;

    public WebhookController(AssinaturaService assinaturaService) {
        this.assinaturaService = assinaturaService;
    }

    @PostMapping("/pagamento/notificacao")
    public ResponseEntity<Void> receberNotificacaoPagamento(@RequestBody NotificacaoDoGateway notificacao) {
        
        if (notificacao != null && "approved".equals(notificacao.getStatus())) {
            
            String externalReference = notificacao.getExternalReference();
            
            if (externalReference == null || externalReference.isBlank()) {
                System.err.println("Webhook recebido sem external_reference. Ignorando.");
                return ResponseEntity.ok().build();
            }

            try {
                Long idDaAssinatura = Long.parseLong(externalReference);
                
                String gatewayId = notificacao.getPaymentId() != null ? 
                                   notificacao.getPaymentId() : 
                                   notificacao.getSubscriptionId();

                assinaturaService.ativarAssinatura(idDaAssinatura, gatewayId);
            
            } catch (NumberFormatException e) {
                System.err.println("Erro ao processar webhook. ExternalReference não é um Long: " + externalReference);
             
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                System.err.println("Erro ao ativar assinatura: " + e.getMessage());
          
                return ResponseEntity.status(500).build();
            }
        }
    
        return ResponseEntity.ok().build();
    }
}