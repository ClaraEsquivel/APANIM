package com.example.apanim.service;

import com.example.apanim.DTO.PlanoCadastroDTO;
import com.example.apanim.DTO.PlanoResponseDTO;
import com.example.apanim.model.Plano;
import com.example.apanim.repository.PlanoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanoService {

    private final PlanoRepository planoRepository;

    public PlanoService(PlanoRepository planoRepository) {
        this.planoRepository = planoRepository;
    }

    public List<PlanoResponseDTO> listarPlanosDisponiveis() {
        return planoRepository.findAll()
                .stream()
                .map(PlanoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Plano criarPlano(PlanoCadastroDTO dto) {
        planoRepository.findByNome(dto.getNome()).ifPresent(p -> {
            throw new IllegalArgumentException("Um plano com este nome já existe.");
        });

        Plano plano = new Plano();
        plano.setNome(dto.getNome());
        plano.setPreco(dto.getPreco());
        plano.setDescricao(dto.getDescricao());
        plano.setGatewayPlanId(dto.getGatewayPlanId());

        return planoRepository.save(plano);
    }
}