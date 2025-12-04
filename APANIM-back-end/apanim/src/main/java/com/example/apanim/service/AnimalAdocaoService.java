package com.example.apanim.service;

import com.example.apanim.DTO.AnimalAdocaoCadastroDTO;
import com.example.apanim.DTO.AnimalAdocaoResponseDTO;
import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.StatusVacinacao;
import com.example.apanim.model.AnimalAdocao;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.AnimalAdocaoRepository;
import com.example.apanim.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnimalAdocaoService {

    private final AnimalAdocaoRepository animalAdocaoRepository;
    private final UsuarioRepository usuarioRepository;

    public AnimalAdocaoService(AnimalAdocaoRepository animalAdocaoRepository, UsuarioRepository usuarioRepository) {
        this.animalAdocaoRepository = animalAdocaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public AnimalAdocao salvarAnimalAdocao(AnimalAdocaoCadastroDTO dto, Long usuarioId) {
        animalAdocaoRepository.findByNomeAndUsuarioId(dto.getNome(), usuarioId)
            .ifPresent(u -> {
                throw new IllegalArgumentException("Você já cadastrou um animal com este nome.");
            });

        UsuarioModel dono = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        AnimalAdocao animalAdocao = new AnimalAdocao();
        
        // Dados básicos
        animalAdocao.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        animalAdocao.setFaixaEtariaAnimal(FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal));
        animalAdocao.setRaca(dto.getRaca());
        animalAdocao.setPorte(dto.getPorte());
        animalAdocao.setSexoAnimal(dto.getSexoAnimal());
        animalAdocao.setEspecie(dto.getEspecie());
        animalAdocao.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalAdocao.setLocalizacao(dto.getLocalizacao());
        animalAdocao.setCor(dto.getCor());

        // --- Alteração: Usando Enums de Status ---
        animalAdocao.setStatusVacinacao(dto.getStatusVacinacao());
        animalAdocao.setStatusVermifugacao(dto.getStatusVermifugacao());
        animalAdocao.setStatusCastracao(dto.getStatusCastracao());

        if (dto.getStatusVacinacao() != StatusVacinacao.NAO_SEI && dto.getStatusVacinacao() != StatusVacinacao.NAO) { 
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o status de vacinação indica que o animal foi vacinado, a lista de vacinas não pode ser vazia.");
            }
            animalAdocao.setVacinas(dto.getVacinas());

        } else {
            animalAdocao.setVacinas(new ArrayList<>()); 
        }

        animalAdocao.setResumo(dto.getResumo());
        animalAdocao.setFotoUrl(dto.getFotoUrl());
        animalAdocao.setVideoUrl(dto.getVideoUrl());
        animalAdocao.setUsuario(dono);

        return animalAdocaoRepository.save(animalAdocao);
    }

    public List<AnimalAdocaoResponseDTO> listarAnimaisAdocao() {
        return animalAdocaoRepository
                .findAllWithUsuario()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AnimalAdocaoResponseDTO toDTO(AnimalAdocao animalAdocao) {
        // --- Alteração: Passando os Enums para o construtor atualizado do DTO ---
        return new AnimalAdocaoResponseDTO(
            animalAdocao.getId(),
            animalAdocao.getNome(),
            animalAdocao.getFaixaEtariaAnimal(),
            animalAdocao.getRaca(),
            animalAdocao.getPorte(),
            animalAdocao.getSexoAnimal(),
            animalAdocao.getEspecie(),
            animalAdocao.getCondicaoEspecial(),
            animalAdocao.getLocalizacao(),
            animalAdocao.getCor(),
            animalAdocao.getStatusVacinacao(),     // Enum
            animalAdocao.getStatusVermifugacao(),  // Enum
            animalAdocao.getStatusCastracao(),     // Enum
            animalAdocao.getResumo(),
            animalAdocao.getFotoUrl(),
            animalAdocao.getVideoUrl(),
            animalAdocao.getUsuario().getId(),
            animalAdocao.getVacinas(),
            animalAdocao.getUsuario().getEmail(),
            animalAdocao.getUsuario().getTelefones()
        );
    }

    @Transactional
    public AnimalAdocao atualizar(Long id, AnimalAdocaoCadastroDTO dto) {
        AnimalAdocao animalAdocao = animalAdocaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        if (!animalAdocao.getNome().equals(dto.getNome())) {
            animalAdocaoRepository.findByNomeAndUsuarioId(dto.getNome(), dto.getUsuarioId())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("Você já cadastrou um animal com este novo nome.");
                });
        }

        // Atualização dos dados
        animalAdocao.setNome(dto.getNome());
        animalAdocao.setFaixaEtariaAnimal(FaixaEtariaAnimal.fromIdadeMeses(dto.getIdadeEmMeses()));
        animalAdocao.setRaca(dto.getRaca());
        animalAdocao.setPorte(dto.getPorte());
        animalAdocao.setSexoAnimal(dto.getSexoAnimal());
        animalAdocao.setEspecie(dto.getEspecie());
        animalAdocao.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalAdocao.setLocalizacao(dto.getLocalizacao());
        animalAdocao.setCor(dto.getCor());

        // --- Alteração: Atualizando Status com Enums ---
        animalAdocao.setStatusVacinacao(dto.getStatusVacinacao());
        animalAdocao.setStatusVermifugacao(dto.getStatusVermifugacao());
        animalAdocao.setStatusCastracao(dto.getStatusCastracao());

        // Lógica de Vacinas na Atualização
        if (dto.getStatusVacinacao() != StatusVacinacao.NAO_SEI && dto.getStatusVacinacao() != StatusVacinacao.NAO) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }
            animalAdocao.setVacinas(dto.getVacinas());

        } else {
            animalAdocao.setVacinas(new ArrayList<>()); 
        }

        animalAdocao.setResumo(dto.getResumo());
        animalAdocao.setFotoUrl(dto.getFotoUrl());
        animalAdocao.setVideoUrl(dto.getVideoUrl());

        return animalAdocaoRepository.save(animalAdocao);
    }

    @Transactional
    public void excluir(Long id) {
        if (animalAdocaoRepository.existsById(id)) {
            animalAdocaoRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Animal não encontrado.");
        }
    }
}