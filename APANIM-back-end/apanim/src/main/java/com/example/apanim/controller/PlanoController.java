package com.example.apanim.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apanim.model.Plano;
import com.example.apanim.repository.PlanoRepository;

@RestController
@RequestMapping("/planos")
public class PlanoController {

    private final PlanoRepository planoRepository;

    public PlanoController(PlanoRepository planoRepository) {
        this.planoRepository = planoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Plano>> listarPlanos() {
        List<Plano> planos = planoRepository.findAll();
        return ResponseEntity.ok(planos);
    }
}