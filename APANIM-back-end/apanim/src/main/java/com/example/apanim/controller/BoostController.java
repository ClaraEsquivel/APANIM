package com.example.apanim.controller;

import com.example.apanim.DTO.BoostResponseDTO;
import com.example.apanim.service.BoostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/boosts") // Endpoint REST padrão
public class BoostController {

    private final BoostService boostService;

    public BoostController(BoostService boostService) {
        this.boostService = boostService;
    }

    @GetMapping
    public ResponseEntity<List<BoostResponseDTO>> listarTodos() {
        List<BoostResponseDTO> lista = boostService.listarBoostsDisponiveis();

        // Se a lista estiver vazia, retorna 204 No Content
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Retorna 200 OK com a lista de boosts
        return ResponseEntity.ok(lista);
    }
}