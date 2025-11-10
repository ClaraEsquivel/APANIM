package com.example.apanim.controller;

import com.example.apanim.DTO.VendedorCadastroDTO;
import com.example.apanim.DTO.VendedorResponseDTO;
import com.example.apanim.service.VendedorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vendedor")
@CrossOrigin(origins = "*")

public class VendedorController {

    private VendedorService vendedorService;

    public VendedorController(VendedorService vendedorService) {

        this.vendedorService = vendedorService;
    }

    @GetMapping
    public ResponseEntity<List<VendedorResponseDTO>> listarTodos() {
        return ResponseEntity.ok(vendedorService.listarTodosVendedores());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody VendedorCadastroDTO dto) {
        vendedorService.salvarVendedor(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Vendedor cadastrado com sucesso."));
    }

    @PutMapping("/{email}")
    public ResponseEntity<Map<Object, String>> atualizar(@PathVariable String email, String cpf,
                                                         @Valid @RequestBody VendedorCadastroDTO dto) {
        vendedorService.atualizar(email, cpf, dto);
        return ResponseEntity.ok(Map.of("mensagem", "Vendedor atualizado com sucesso."));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Map<Object, String>> excluir(@PathVariable String email) {
        vendedorService.excluir(email);
        return ResponseEntity.ok(Map.of("mensagem", "Usuário excluido com sucesso."));
    }
}
