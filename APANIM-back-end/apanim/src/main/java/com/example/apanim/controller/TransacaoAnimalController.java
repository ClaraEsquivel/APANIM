package com.example.apanim.controller;

import com.example.apanim.DTO.BoletoResponse;
import com.example.apanim.DTO.PagamentoRequest;
import com.example.apanim.DTO.PagamentoResponse;
import com.example.apanim.DTO.PixResponse;
import com.example.apanim.service.TransacaoAnimalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pagamento")
public class TransacaoAnimalController {

    private final TransacaoAnimalService transacaoAnimalService;

    public TransacaoAnimalController(TransacaoAnimalService transacaoAnimalService) {
        this.transacaoAnimalService = transacaoAnimalService;
    }

    @PostMapping("/{animalId}/cartao")
    public ResponseEntity<PagamentoResponse> pagarComCartao(
            @PathVariable Long animalId,
            @RequestParam Long usuarioId, 
            @Valid @RequestBody PagamentoRequest request) {

        PagamentoResponse response = transacaoAnimalService.processarPagamentoCartao(animalId, usuarioId, request);

        if ("APROVADO".equals(response.getStatus())) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/{animalId}/boleto")
    public ResponseEntity<BoletoResponse> gerarBoleto(
            @PathVariable Long animalId,
            @RequestParam Long usuarioId) {
        
        BoletoResponse response = transacaoAnimalService.gerarBoleto(animalId, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/{animalId}/pix")
    public ResponseEntity<PixResponse> gerarPix(
            @PathVariable Long animalId,
            @RequestParam Long usuarioId) {
        
        PixResponse response = transacaoAnimalService.gerarPix(animalId, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // NOTA: Os webhooks (notificações) para vendas avulsas e assinaturas
    // podem ser unificados no WebhookController, mas é crucial
    // que ele saiba diferenciar se o externalReference pertence a uma
    // TransacaoAnimal ou a uma Assinatura.
}