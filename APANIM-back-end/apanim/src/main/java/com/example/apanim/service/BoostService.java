package com.example.apanim.service;

import com.example.apanim.DTO.BoostResponseDTO;
import com.example.apanim.model.Boost;
import com.example.apanim.repository.BoostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoostService {

    private final BoostRepository boostRepository;

    public BoostService(BoostRepository boostRepository) {
        this.boostRepository = boostRepository;
    }

    /**
     * Lista todos os pacotes de Boosts disponíveis.
     * @return Uma lista de BoostResponseDTO.
     */
    public List<BoostResponseDTO> listarBoostsDisponiveis() {
        // Busca todos os boosts no banco de dados
        List<Boost> boosts = boostRepository.findAll();

        // Mapeia as entidades Boost para BoostResponseDTO
        return boosts.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Converte a entidade Boost para o DTO de resposta.
     */
    public BoostResponseDTO toDTO(Boost boost) {
        return new BoostResponseDTO(boost);
    }
}