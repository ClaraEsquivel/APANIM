package com.example.apanim.service;

import com.example.apanim.DTO.AnimalAdocaoCadastroDTO;
import com.example.apanim.DTO.AnimalAdocaoResponseDTO;
import com.example.apanim.Enum.FaixaEtariaAnimal;
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

    @SuppressWarnings("null")
    public AnimalAdocao salvarAnimalAdocao(AnimalAdocaoCadastroDTO dto, Long usuarioId) {
        animalAdocaoRepository.findByNomeAndUsuarioId(dto.getNome(), usuarioId)
            .ifPresent(u ->{
                throw new IllegalArgumentException("Você já cadastrou um animal com este nome.");
            });

        UsuarioModel dono = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        AnimalAdocao animalAdocao = new AnimalAdocao();
        animalAdocao.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal);
        
        animalAdocao.setFaixaEtariaAnimal(faixaCorreta);
        animalAdocao.setRaca(dto.getRaca());
        animalAdocao.setPorte(dto.getPorte());
        animalAdocao.setSexoAnimal(dto.getSexoAnimal());
        animalAdocao.setEspecie(dto.getEspecie());
        animalAdocao.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalAdocao.setLocalizacao(dto.getLocalizacao());
        animalAdocao.setCor(dto.getCor());
        animalAdocao.setVacinado(dto.isVacinado());
        if (Boolean.TRUE.equals(dto.isVacinado())) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }

            animalAdocao.setVacinas(dto.getVacinas());

        } else {
        
            animalAdocao.setVacinas(new ArrayList<>()); 
        }
        animalAdocao.setVermifugado(dto.isVermifugado());
        animalAdocao.setCastrado(dto.isCastrado());
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
            animalAdocao.getVacinado(),
            animalAdocao.getVermifugado(),
            animalAdocao.getCastrado(),
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
    @SuppressWarnings("null")
    public AnimalAdocao atualizar(Long id, AnimalAdocaoCadastroDTO dto) {
        AnimalAdocao animalAdocao = animalAdocaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        if (!animalAdocao.getNome().equals(dto.getNome())) {
        animalAdocaoRepository.findByNomeAndUsuarioId(dto.getNome(), dto.getUsuarioId())
            .ifPresent(u -> {
                throw new IllegalArgumentException("Você já cadastrou um animal com este novo nome.");
            });
        }

        animalAdocao.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal);
        
        animalAdocao.setFaixaEtariaAnimal(faixaCorreta);
        animalAdocao.setRaca(dto.getRaca());
        animalAdocao.setPorte(dto.getPorte());
        animalAdocao.setSexoAnimal(dto.getSexoAnimal());
        animalAdocao.setEspecie(dto.getEspecie());
        animalAdocao.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalAdocao.setLocalizacao(dto.getLocalizacao());
        animalAdocao.setCor(dto.getCor());
        animalAdocao.setVacinado(dto.isVacinado());
        if (Boolean.TRUE.equals(dto.isVacinado())) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }

            animalAdocao.setVacinas(dto.getVacinas());

        } else {
        
            animalAdocao.setVacinas(new ArrayList<>()); 
        }
        animalAdocao.setVermifugado(dto.isVermifugado());
        animalAdocao.setCastrado(dto.isCastrado());
        animalAdocao.setResumo(dto.getResumo());
        animalAdocao.setFotoUrl(dto.getFotoUrl());
        animalAdocao.setVideoUrl(dto.getVideoUrl());

        return animalAdocaoRepository.save(animalAdocao);
    }

    @SuppressWarnings("null")
    public void excluir(Long id) {
        AnimalAdocao animalAdocao = animalAdocaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        
        if (animalAdocao != null) {
            animalAdocaoRepository.delete(animalAdocao);
        }
    }

}