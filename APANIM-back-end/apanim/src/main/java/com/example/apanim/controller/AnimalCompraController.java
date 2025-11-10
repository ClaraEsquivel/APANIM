package com.example.apanim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apanim.DTO.AnimalCompraCadastroDTO;
import com.example.apanim.DTO.AnimalCompraResponseDTO;
import com.example.apanim.service.AnimalCompraService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/animalCompra")
public class AnimalCompraController {
    
    private final AnimalCompraService animalCompraService;

    public AnimalCompraController(AnimalCompraService animalCompraService) {
        this.animalCompraService = animalCompraService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalCompraResponseDTO>> listarTodosCompra() {
        return ResponseEntity.ok(animalCompraService.listarAnimaisCompra());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvarAnimalCompra(@Valid @RequestBody AnimalCompraCadastroDTO dto) {
        animalCompraService.salvarAnimalCompra(dto, dto.getVendedorId());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of("message", "Animal cadastrado com sucesso"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizarAnimalCompra(
        @PathVariable Long id, 
        @Valid @RequestBody AnimalCompraCadastroDTO dto) {
        
        animalCompraService.atualizarAnimalCompra(id, dto);
        return ResponseEntity.ok(Map.of("mensagem", "Animal atualizado com sucesso."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> excluirAnimalCompra(@PathVariable Long id) {
        animalCompraService.excluirAnimalCompra(id);
        return ResponseEntity.ok(Map.of("mensagem", "Animal excluido com sucesso."));    
    }

}
