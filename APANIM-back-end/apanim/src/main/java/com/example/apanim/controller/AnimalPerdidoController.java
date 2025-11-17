package com.example.apanim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apanim.DTO.AnimalPerdidoCadastroDTO;
import com.example.apanim.DTO.AnimalPerdidoResponseDTO;
import com.example.apanim.model.AnimalPerdido;
import com.example.apanim.service.AnimalPerdidoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/animalPerdido")
public class AnimalPerdidoController {

    private final AnimalPerdidoService animalPerdidoService;

    public AnimalPerdidoController(AnimalPerdidoService animalPerdidoService) {
        this.animalPerdidoService = animalPerdidoService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalPerdidoResponseDTO>> listarTodos() {
        List<AnimalPerdidoResponseDTO> lista = animalPerdidoService.listarAnimaisPerdidos();
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody AnimalPerdidoCadastroDTO dto) {
        animalPerdidoService.salvarAnimalPerdido(dto, dto.getUsuarioId());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Animal cadastrado com sucesso."));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<AnimalPerdidoResponseDTO> atualizar(
            @PathVariable Long id, 
            @Valid @RequestBody AnimalPerdidoCadastroDTO dto) {

        AnimalPerdido animalAtualizado = animalPerdidoService.atualizar(id, dto);
        AnimalPerdidoResponseDTO responseDTO = animalPerdidoService.toDTO(animalAtualizado);
        
        return ResponseEntity.ok(responseDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> excluir(@PathVariable Long id) {
        animalPerdidoService.excluir(id);
        return ResponseEntity.ok(Map.of("mensagem", "Animal perdido excluído com sucesso."));
    }
}