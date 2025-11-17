package com.example.apanim.service;

import com.example.apanim.model.Assinatura;
import org.springframework.stereotype.Service;

@Service
public class PagamentoService {
    
    public String criarLinkDePagamento(Assinatura assinatura) {
        Long assinaturaId = assinatura.getId();
        String gatewayPlanId = assinatura.getPlano().getGatewayPlanId();
        
        return "https://gateway.com/pagar/pix-copia-e-cola-12345";
    }

    public void cancelarAssinaturaNoGateway(String gatewaySubscriptionId) {
        System.out.println("Cancelando assinatura " + gatewaySubscriptionId + " no gateway.");
    }
}