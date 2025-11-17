package com.example.apanim.controller;

import com.example.apanim.DTO.AssinaturaRequestDTO;
import com.example.apanim.DTO.AssinaturaResponseDTO;
import com.example.apanim.Enum.StatusAssinatura;
import com.example.apanim.model.Assinatura;
import com.example.apanim.service.AssinaturaService;
import com.example.apanim.service.PagamentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/assinaturas")
public class AssinaturaController {

    private final AssinaturaService assinaturaService;
    private final PagamentoService pagamentoService;

    public AssinaturaController(AssinaturaService assinaturaService, PagamentoService pagamentoService) {
        this.assinaturaService = assinaturaService;
        this.pagamentoService = pagamentoService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> criarAssinatura(@Valid @RequestBody AssinaturaRequestDTO dto) {
        Assinatura novaAssinatura = assinaturaService.criarAssinatura(dto.getUsuarioId(), dto.getPlanoId());

        String linkDePagamento = pagamentoService.criarLinkDePagamento(novaAssinatura);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "assinaturaId", novaAssinatura.getId(),
            "status", novaAssinatura.getStatus(),
            "linkDePagamento", linkDePagamento // Pode ser um QR Code, link, etc.
        ));
    }

    @GetMapping("/status/{usuarioId}")
    public ResponseEntity<Map<String, StatusAssinatura>> getStatus(@PathVariable Long usuarioId) {
        StatusAssinatura status = assinaturaService.getStatusAssinatura(usuarioId);
        return ResponseEntity.ok(Map.of("status", status));
    }

    @PostMapping("/{assinaturaId}/cancelar")
    public ResponseEntity<AssinaturaResponseDTO> cancelar(@PathVariable Long assinaturaId) {
        Assinatura assinaturaCancelada = assinaturaService.cancelarAssinatura(assinaturaId);
        return ResponseEntity.ok(new AssinaturaResponseDTO(assinaturaCancelada));
    }
}