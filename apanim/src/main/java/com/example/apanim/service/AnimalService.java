package com.example.apanim.service;

import com.example.apanim.DTO.AnimalCadastroDTO;
import com.example.apanim.DTO.AnimalResponseDTO;
import com.example.apanim.model.AnimalModel;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.AnimalRepository;
import com.example.apanim.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {
    private final AnimalRepository animalRepository;
    private final UsuarioRepository usuarioRepository;

    public AnimalService(AnimalRepository animalRepository, UsuarioRepository usuarioRepository) {
        this.animalRepository = animalRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public AnimalModel salvarAnimalModel(AnimalCadastroDTO dto, Long usuarioId) {
        animalRepository.findByNomeAndUsuarioId(dto.getNome(), usuarioId)
            .ifPresent(u ->{
                throw new IllegalArgumentException("Você já cadastrou um animal com este nome.");
            });

        UsuarioModel dono = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        AnimalModel animalModel = new AnimalModel();
        animalModel.setNome(dto.getNome());
        animalModel.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        animalModel.setRaca(dto.getRaca());
        animalModel.setPorte(dto.getPorte());
        animalModel.setSexoAnimal(dto.getSexoAnimal());
        animalModel.setEspecie(dto.getEspecie());
        animalModel.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalModel.setLogradouro(dto.getLogradouro());
        animalModel.setBairro(dto.getBairro());
        animalModel.setCor(dto.getCor());
        animalModel.setVacinado(dto.isVacinado());
        animalModel.setVermifugado(dto.isVermifugado());
        animalModel.setCastrado(dto.isCastrado());
        animalModel.setResumo(dto.getResumo());

        animalModel.setUsuario(dono);

        return animalRepository.save(animalModel);
    }

    public List<AnimalResponseDTO> listarTodosAnimais() {
        return animalRepository
                .findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AnimalResponseDTO toDTO(AnimalModel animalModel) {
        return new AnimalResponseDTO(
            animalModel.getId(),
            animalModel.getNome(), 
            animalModel.getFaixaEtariaAnimal(), 
            animalModel.getRaca(), 
            animalModel.getPorte(), 
            animalModel.getSexoAnimal(), 
            animalModel.getEspecie(), 
            animalModel.getCondicaoEspecial(),  
            animalModel.getLogradouro(), 
            animalModel.getBairro(), 
            animalModel.getCor(), 
            animalModel.getVacinado(), 
            animalModel.getVermifugado(), 
            animalModel.getCastrado(), 
            animalModel.getResumo(),
            animalModel.getUsuario().getId());
    }

    @Transactional
    public AnimalModel atualizar(Long id, AnimalCadastroDTO dto) {
        AnimalModel animalModel = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        if (!animalModel.getNome().equals(dto.getNome())) {
        animalRepository.findByNomeAndUsuarioId(dto.getNome(), dto.getUsuarioId())
            .ifPresent(u -> {
                throw new IllegalArgumentException("Você já cadastrou um animal com este novo nome.");
            });
        }

        if (!animalModel.getNome().equals(dto.getNome())) {
        animalRepository.findByNomeAndUsuarioId(dto.getNome(), dto.getUsuarioId())
            .ifPresent(u -> {
                throw new IllegalArgumentException("Você já cadastrou um animal com este novo nome.");
            });
        }

        animalModel.setNome(dto.getNome());
        animalModel.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        animalModel.setRaca(dto.getRaca());
        animalModel.setPorte(dto.getPorte());
        animalModel.setSexoAnimal(dto.getSexoAnimal());
        animalModel.setEspecie(dto.getEspecie());
        animalModel.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalModel.setLogradouro(dto.getLogradouro());
        animalModel.setBairro(dto.getBairro());
        animalModel.setCor(dto.getCor());
        animalModel.setVacinado(dto.isVacinado());
        animalModel.setVermifugado(dto.isVermifugado());
        animalModel.setCastrado(dto.isCastrado());
        animalModel.setResumo(dto.getResumo());

        return animalRepository.save(animalModel);
    }

    public void excluir(Long id) {
        AnimalModel animalModel = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        animalRepository.delete(animalModel);
    }

}