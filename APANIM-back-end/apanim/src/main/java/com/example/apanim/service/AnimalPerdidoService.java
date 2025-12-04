package com.example.apanim.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.apanim.DTO.AnimalPerdidoCadastroDTO;
import com.example.apanim.DTO.AnimalPerdidoResponseDTO;
import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.model.AnimalPerdido;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.AnimalPerdidoRepository;
import com.example.apanim.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.Getter;

@Getter
@Service
public class AnimalPerdidoService {

    private final AnimalPerdidoRepository animalPerdidoRepository;
    private final UsuarioRepository usuarioRepository;

    public AnimalPerdidoService(AnimalPerdidoRepository animalPerdidoRepository, UsuarioRepository usuarioRepository) {
        this.animalPerdidoRepository = animalPerdidoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public AnimalPerdido salvarAnimalPerdido(AnimalPerdidoCadastroDTO dto, Long usuarioId) {
        animalPerdidoRepository.findByNomeAndUsuarioId(dto.getNome(), usuarioId)
            .ifPresent(u -> {
                throw new IllegalArgumentException("Você já cadastrou um animal com este nome.");
            });

        UsuarioModel dono = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        AnimalPerdido animalPerdido = new AnimalPerdido();
        animalPerdido.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        animalPerdido.setFaixaEtariaAnimal(FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal));
        animalPerdido.setRaca(dto.getRaca());
        animalPerdido.setPorte(dto.getPorte());
        animalPerdido.setSexoAnimal(dto.getSexoAnimal());
        animalPerdido.setEspecie(dto.getEspecie());
        animalPerdido.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalPerdido.setLocalizacao(dto.getLocalizacao());
        animalPerdido.setCor(dto.getCor());

        // --- Correção: Usando Enums e removendo booleanos antigos ---
        animalPerdido.setStatusVacinacao(dto.getStatusVacinacao());
        animalPerdido.setStatusVermifugacao(dto.getStatusVermifugacao());
        animalPerdido.setStatusCastracao(dto.getStatusCastracao());

        // --- Correção: Lógica de Vacinas baseada no Enum (Usando &&) ---
        // IMPORTANTE: Verifique se o nome no seu Enum é NAO_VACINADO ou apenas NAO. Ajuste conforme necessário.
        if (dto.getStatusVacinacao() != StatusVacinacao.NAO_SEI && dto.getStatusVacinacao() != StatusVacinacao.NAO) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o status indica vacinação, a lista de vacinas não pode ser vazia.");
            }
            animalPerdido.setVacinas(dto.getVacinas());
        } else {
            animalPerdido.setVacinas(new ArrayList<>()); 
        }
        
        animalPerdido.setResumo(dto.getResumo());
        animalPerdido.setFotoUrl(dto.getFotoUrl());
        animalPerdido.setVideoUrl(dto.getVideoUrl());
        animalPerdido.setData(dto.getData()); // Campo específico de Animal Perdido

        animalPerdido.setUsuario(dono);

        return animalPerdidoRepository.save(animalPerdido);
    }

    public List<AnimalPerdidoResponseDTO> listarAnimaisPerdidos() {
        return animalPerdidoRepository
                .findAllWithUsuario()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AnimalPerdidoResponseDTO toDTO(AnimalPerdido animalPerdido) {
        return new AnimalPerdidoResponseDTO(
            animalPerdido.getId(),
            animalPerdido.getNome(),
            animalPerdido.getFaixaEtariaAnimal(),
            animalPerdido.getRaca(),
            animalPerdido.getPorte(),
            animalPerdido.getSexoAnimal(),
            animalPerdido.getEspecie(),
            animalPerdido.getCondicaoEspecial(),
            animalPerdido.getLocalizacao(),
            animalPerdido.getCor(),
            animalPerdido.getStatusVacinacao(),
            animalPerdido.getStatusVermifugacao(),
            animalPerdido.getStatusCastracao(),
            animalPerdido.getResumo(),
            animalPerdido.getFotoUrl(),
            animalPerdido.getVideoUrl(),
            animalPerdido.getUsuario().getId(),
            animalPerdido.getData(),
            animalPerdido.getVacinas(),
            animalPerdido.getUsuario().getEmail(),
            animalPerdido.getUsuario().getTelefones()
        );
    }

    @Transactional
    public AnimalPerdido atualizar(Long id, AnimalPerdidoCadastroDTO dto) {
        AnimalPerdido animalPerdido = animalPerdidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        if (!animalPerdido.getNome().equals(dto.getNome())) {
            Long usuarioIdDoDono = animalPerdido.getUsuario().getId(); 
            
            Optional<AnimalPerdido> animalDuplicado = animalPerdidoRepository.findByNomeAndUsuarioId(dto.getNome(), usuarioIdDoDono);
            
            if (animalDuplicado.isPresent() && !animalDuplicado.get().getId().equals(id)) {
                throw new IllegalArgumentException("Você já cadastrou outro animal com este novo nome.");
            }
        }

        animalPerdido.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        animalPerdido.setFaixaEtariaAnimal(FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal));
        animalPerdido.setRaca(dto.getRaca());
        animalPerdido.setPorte(dto.getPorte());
        animalPerdido.setSexoAnimal(dto.getSexoAnimal());
        animalPerdido.setEspecie(dto.getEspecie());
        animalPerdido.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalPerdido.setLocalizacao(dto.getLocalizacao());
        animalPerdido.setCor(dto.getCor());

        // --- Correção: Atualização com Enums ---
        animalPerdido.setStatusVacinacao(dto.getStatusVacinacao());
        animalPerdido.setStatusVermifugacao(dto.getStatusVermifugacao());
        animalPerdido.setStatusCastracao(dto.getStatusCastracao());
        
        // --- Correção: Lógica de Vacinas na Atualização ---
        if (dto.getStatusVacinacao() != StatusVacinacao.NAO_SEI && dto.getStatusVacinacao() != StatusVacinacao.NAO) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o status indica vacinação, a lista de vacinas não pode ser vazia.");
            }
            animalPerdido.setVacinas(dto.getVacinas());
        } else {
            animalPerdido.setVacinas(new ArrayList<>()); 
        }
        
        animalPerdido.setResumo(dto.getResumo());
        animalPerdido.setFotoUrl(dto.getFotoUrl());
        animalPerdido.setVideoUrl(dto.getVideoUrl());
        animalPerdido.setData(dto.getData());
        
        return animalPerdidoRepository.save(animalPerdido);
    }

    public void excluir(Long id) {
        AnimalPerdido animalPerdido = animalPerdidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        
        animalPerdidoRepository.delete(animalPerdido);
    }
}