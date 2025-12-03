// src/main/java/com/example/apanim/service/impl/WebhookSecurityServiceImpl.java
package com.example.apanim.service.impl;

import com.example.apanim.service.WebhookSecurityService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

// Importações para a lógica de Hashing (exemplo com HMAC SHA256)
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Formatter;

@Service
public class WebhookSecurityServiceImpl implements WebhookSecurityService {

    // A chave secreta fornecida pelo Gateway de Pagamento, deve vir do seu application.properties/yml
    @Value("${webhook.secret.key}")
    private String webhookSecretKey; 

    // **IMPORTANTE:** Este método deve seguir a EXATA especificação do seu Gateway!
    // Este é um exemplo genérico usando HMAC SHA256.
    @Override
    public boolean isSignatureValid(String payload, String signature) {
        if (payload == null || signature == null || signature.isEmpty()) {
            return false;
        }
        
        // 1. O Gateway de Pagamento geralmente especifica como extrair ou usar a assinatura.
        // Exemplo: Se o cabeçalho for "t=timestamp,v1=hash", você precisa parsear o hash.
        String expectedHash = signature; // Simplificando para o exemplo

        try {
            // 2. Cria o objeto MAC (Message Authentication Code) com o algoritmo correto
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            
            // 3. Define a chave secreta
            SecretKeySpec secretKey = new SecretKeySpec(webhookSecretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secretKey);

            // 4. Calcula o hash do payload (corpo bruto da requisição)
            byte[] hashBytes = sha256_HMAC.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            
            // 5. Converte o hash para uma String Hexadecimal (formato comum)
            String calculatedHash = bytesToHex(hashBytes); 
            
            // 6. Compara o hash calculado com o hash recebido no cabeçalho
            return calculatedHash.equalsIgnoreCase(expectedHash);

        } catch (Exception e) {
            // Log de erro no sistema
            // logger.error("Erro ao verificar a assinatura do webhook", e);
            return false;
        }
    }
    
    // Método utilitário para conversão de bytes para Hex
    private static String bytesToHex(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }
}