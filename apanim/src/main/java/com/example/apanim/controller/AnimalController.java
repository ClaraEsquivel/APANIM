package com.example.apanim.controller;

import com.example.apanim.model.AnimalModel;
import com.example.apanim.service.AnimalService;
import com.example.apanim.DTO.AnimalCadastroDTO;
import com.example.apanim.DTO.AnimalResponseDTO;
import com.example.apanim.DTO.UsuarioCadastroDTO;
import com.example.apanim.DTO.UsuarioResponseDTO;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/animais")
public class AnimalController {

    private final AnimalService animalService;
  

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalResponseDTO>> listarTodos() {
        return ResponseEntity.ok(animalService.listarTodosAnimais());
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody AnimalCadastroDTO dto) {
        animalService.salvarAnimalModel(dto, dto.getUsuarioId());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Animal cadastrado com sucesso."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(
            @PathVariable Long id, 
            @Valid @RequestBody AnimalCadastroDTO dto) {
        
        animalService.atualizar(id, dto);
        return ResponseEntity.ok(Map.of("mensagem", "Animal atualizado com sucesso."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<Object, String>> excluir(@PathVariable Long id) {
        animalService.excluir(id);
        return ResponseEntity.ok(Map.of("mensagem", "Animal excluido com sucesso."));    
    }

}