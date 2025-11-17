package com.example.apanim.controller;

import com.example.apanim.DTO.PlanoCadastroDTO;
import com.example.apanim.DTO.PlanoResponseDTO;
import com.example.apanim.model.Plano;
import com.example.apanim.service.PlanoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planos")
public class PlanoController {

    private final PlanoService planoService;

    public PlanoController(PlanoService planoService) {
        this.planoService = planoService;
    }

    @GetMapping
    public ResponseEntity<List<PlanoResponseDTO>> listarPlanos() {
        List<PlanoResponseDTO> planos = planoService.listarPlanosDisponiveis();
        return ResponseEntity.ok(planos);
    }

    @PostMapping
    public ResponseEntity<PlanoResponseDTO> criarPlano(@Valid @RequestBody PlanoCadastroDTO dto) {
        Plano planoCriado = planoService.criarPlano(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoResponseDTO(planoCriado));
    }
}