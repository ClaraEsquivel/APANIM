package com.example.apanim.service;

public interface WebhookSecurityService {
    /**
     * Verifica a assinatura criptográfica do webhook para garantir sua autenticidade.
     * @param payload O corpo bruto (String) da requisição.
     * @param signature A assinatura extraída do cabeçalho HTTP (ex: X-Signature).
     * @return true se a assinatura for válida, false caso contrário.
     */
    boolean isSignatureValid(String payload, String signature);
}