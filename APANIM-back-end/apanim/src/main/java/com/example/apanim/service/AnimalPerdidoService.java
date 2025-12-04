package com.example.apanim.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.apanim.DTO.AnimalPerdidoCadastroDTO;
import com.example.apanim.DTO.AnimalPerdidoResponseDTO;
import com.example.apanim.Enum.FaixaEtariaAnimal;
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

    // Método de Salvar: Sem alteração significativa, apenas formatação.
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
        // Assume-se que FaixaEtariaAnimal.fromIdadeMeses() está corretamente implementado.
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal); 
        animalPerdido.setFaixaEtariaAnimal(faixaCorreta);
        animalPerdido.setRaca(dto.getRaca());
        animalPerdido.setPorte(dto.getPorte());
        animalPerdido.setSexoAnimal(dto.getSexoAnimal());
        animalPerdido.setEspecie(dto.getEspecie());
        animalPerdido.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalPerdido.setLocalizacao(dto.getLocalizacao());
        animalPerdido.setCor(dto.getCor());
        animalPerdido.setVacinado(dto.isVacinado());
        
        if (Boolean.TRUE.equals(dto.isVacinado())) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }

            animalPerdido.setVacinas(dto.getVacinas());

        } else {
            // Garante que o campo de vacinas não seja nulo, se não estiver vacinado.
            animalPerdido.setVacinas(new ArrayList<>()); 
        }
        
        animalPerdido.setVermifugado(dto.isVermifugado());
        animalPerdido.setCastrado(dto.isCastrado());
        animalPerdido.setResumo(dto.getResumo());
        animalPerdido.setFotoUrl(dto.getFotoUrl());
        animalPerdido.setVideoUrl(dto.getVideoUrl());
        animalPerdido.setData(dto.getData());

        animalPerdido.setUsuario(dono);

        return animalPerdidoRepository.save(animalPerdido);
    }

    // ... (listarAnimaisPerdidos e toDTO permanecem inalterados) ...

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
            animalPerdido.getVacinado(),
            animalPerdido.getVermifugado(),
            animalPerdido.getCastrado(),
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
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal);
        animalPerdido.setFaixaEtariaAnimal(faixaCorreta);
        animalPerdido.setRaca(dto.getRaca());
        animalPerdido.setPorte(dto.getPorte());
        animalPerdido.setSexoAnimal(dto.getSexoAnimal());
        animalPerdido.setEspecie(dto.getEspecie());
        animalPerdido.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalPerdido.setLocalizacao(dto.getLocalizacao());
        animalPerdido.setCor(dto.getCor());
        animalPerdido.setVacinado(dto.isVacinado());
        
        if (Boolean.TRUE.equals(dto.isVacinado())) {
            
            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }

            animalPerdido.setVacinas(dto.getVacinas());

        } else {
            animalPerdido.setVacinas(new ArrayList<>()); 
        }
        
        animalPerdido.setVermifugado(dto.isVermifugado());
        animalPerdido.setCastrado(dto.isCastrado());
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