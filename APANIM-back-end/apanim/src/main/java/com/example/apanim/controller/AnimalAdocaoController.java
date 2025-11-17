package com.example.apanim.controller;

import com.example.apanim.service.AnimalAdocaoService;
import com.example.apanim.DTO.AnimalAdocaoCadastroDTO;
import com.example.apanim.DTO.AnimalAdocaoResponseDTO;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/animalAdocao")
public class AnimalAdocaoController {

    private final AnimalAdocaoService animalAdocaoService;
  

    public AnimalAdocaoController(AnimalAdocaoService animalAdocaoService) {
        this.animalAdocaoService = animalAdocaoService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalAdocaoResponseDTO>> listarTodosA() {
        return ResponseEntity.ok(animalAdocaoService.listarAnimaisAdocao());
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody AnimalAdocaoCadastroDTO dto) {
        animalAdocaoService.salvarAnimalAdocao(dto, dto.getUsuarioId());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Animal cadastrado com sucesso."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(
            @PathVariable Long id, 
            @Valid @RequestBody AnimalAdocaoCadastroDTO dto) {
        
        animalAdocaoService.atualizar(id, dto);
        return ResponseEntity.ok(Map.of("mensagem", "Animal atualizado com sucesso."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<Object, String>> excluir(@PathVariable Long id) {
        animalAdocaoService.excluir(id);
        return ResponseEntity.ok(Map.of("mensagem", "Animal excluido com sucesso."));    
    }

}