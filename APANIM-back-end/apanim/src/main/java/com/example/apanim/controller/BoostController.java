package com.example.apanim.controller;

import com.example.apanim.DTO.BoostResponseDTO;
import com.example.apanim.service.BoostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/boosts") 
public class BoostController {

    private final BoostService boostService;

    public BoostController(BoostService boostService) {
        this.boostService = boostService;
    }

    @GetMapping
    public ResponseEntity<List<BoostResponseDTO>> listarTodos() {
        List<BoostResponseDTO> lista = boostService.listarBoostsDisponiveis();

        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(lista);
    }
}