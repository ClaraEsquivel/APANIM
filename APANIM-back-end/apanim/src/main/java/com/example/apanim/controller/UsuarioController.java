package com.example.apanim.controller;

import com.example.apanim.DTO.UsuarioCadastroDTO;
import com.example.apanim.DTO.UsuarioResponseDTO;
import com.example.apanim.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")

public class UsuarioController {
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodosUsuarios());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody UsuarioCadastroDTO dto) {
        usuarioService.salvarUsuario(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Usuário cadastrado com sucesso."));
    }

    @PutMapping("/{email}")
    public ResponseEntity<Map<Object, String>> atualizar(@PathVariable String email,
                                                         @Valid @RequestBody UsuarioCadastroDTO dto) {
        usuarioService.atualizar(email, dto);
        return ResponseEntity.ok(Map.of("mensagem", "Usuário atualizado com sucesso."));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Map<Object, String>> excluir(@PathVariable String email) {
        usuarioService.excluir(email);
        return ResponseEntity.ok(Map.of("mensagem", "Usuário excluido com sucesso."));
    }
}
