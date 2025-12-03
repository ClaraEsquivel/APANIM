package com.example.apanim.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apanim.DTO.AnimalCompraCadastroDTO;
import com.example.apanim.DTO.AnimalCompraResponseDTO;
import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.model.AnimalCompra;
import com.example.apanim.model.VendedorModel;
import com.example.apanim.repository.AnimalCompraRepository;
import com.example.apanim.repository.VendedorRepository;

import jakarta.transaction.Transactional;

@Service
public class AnimalCompraService {
   private final AnimalCompraRepository animalCompraRepository;
   private final VendedorRepository vendedorRepository;

    public AnimalCompraService(AnimalCompraRepository animalCompraRepository, VendedorRepository vendedorRepository) {
         this.animalCompraRepository = animalCompraRepository;
         this.vendedorRepository = vendedorRepository;
    }

    @SuppressWarnings("null")
    public AnimalCompra salvarAnimalCompra(AnimalCompraCadastroDTO dto, Long vendedorId) {
        animalCompraRepository.findByNomeAndVendedorId(dto.getNome(), vendedorId)
            .ifPresent(animal -> {
                throw new IllegalArgumentException("Animal com esse nome já cadastrado para este vendedor.");
            });

        VendedorModel vendedor = vendedorRepository.findById(vendedorId)
            .orElseThrow(() -> new IllegalArgumentException("Vendedor não encontrado"));

        AnimalCompra animalCompra = new AnimalCompra();
        animalCompra.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal);
        
        animalCompra.setFaixaEtariaAnimal(faixaCorreta);
        animalCompra.setRaca(dto.getRaca());
        animalCompra.setPorte(dto.getPorte());
        animalCompra.setSexoAnimal(dto.getSexoAnimal());
        animalCompra.setEspecie(dto.getEspecie());
        animalCompra.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalCompra.setLocalizacao(dto.getLocalizacao());
        animalCompra.setCor(dto.getCor());
        animalCompra.setVacinado(dto.getVacinado());

        if (Boolean.TRUE.equals(dto.getVacinado())) {

            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
               
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }
            animalCompra.setVacinas(dto.getVacinas());

        } else {
            animalCompra.setVacinas(new ArrayList<>()); 
        }

        animalCompra.setVermifugado(dto.getVermifugado());
        animalCompra.setCastrado(dto.getCastrado());
        animalCompra.setResumo(dto.getResumo());
        animalCompra.setVendedor(vendedor);
        animalCompra.setPedigree(dto.getPedigree());
        animalCompra.setValorDoAnimal(dto.getValorDoAnimal());
        animalCompra.setFotoUrl(dto.getFotoUrl());
        animalCompra.setVideoUrl(dto.getVideoUrl());

        return animalCompraRepository.save(animalCompra);
    }

    public List<AnimalCompraResponseDTO> listarAnimaisCompra() {
        return animalCompraRepository
            .findAllWithVendedor()
            .stream()
            .map(this::toDTO)
            .toList();
    }

    public AnimalCompraResponseDTO toDTO(AnimalCompra animalCompra) {
        return new AnimalCompraResponseDTO(
            animalCompra.getId(),
            animalCompra.getNome(),
            animalCompra.getFaixaEtariaAnimal(),
            animalCompra.getRaca(),
            animalCompra.getPorte(),
            animalCompra.getSexoAnimal(),
            animalCompra.getEspecie(),
            animalCompra.getCondicaoEspecial(),
            animalCompra.getLocalizacao(),
            animalCompra.getCor(),
            animalCompra.getVacinado(),
            animalCompra.getVacinas(),
            animalCompra.getVermifugado(),
            animalCompra.getCastrado(),
            animalCompra.getResumo(),
            animalCompra.getVendedor().getId(),
            animalCompra.getPedigree(),
            animalCompra.getValorDoAnimal(),
            animalCompra.getFotoUrl(),
            animalCompra.getVideoUrl(),
            animalCompra.getVendedor().getEmail(),
            animalCompra.getVendedor().getTelefones()
        );
    }

    @Transactional
    @SuppressWarnings("null")
    public AnimalCompra atualizarAnimalCompra(Long id, AnimalCompraCadastroDTO dto) {
        AnimalCompra animalCompra = animalCompraRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado"));

        if (!animalCompra.getNome().equals(dto.getNome())) {
            animalCompraRepository.findByNomeAndVendedorId(dto.getNome(), dto.getVendedorId())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("Animal com esse nome já cadastrado para este vendedor.");
                });
        }

        if (!animalCompra.getNome().equals(dto.getNome())) {
            animalCompraRepository.findByNomeAndVendedorId(dto.getNome(), dto.getVendedorId())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("Você já cadastrou um animal com este novo nome.");
                });
        }

        animalCompra.setNome(dto.getNome());
        int idadeDoAnimal = dto.getIdadeEmMeses();
        
        FaixaEtariaAnimal faixaCorreta = FaixaEtariaAnimal.fromIdadeMeses(idadeDoAnimal);
        
        animalCompra.setFaixaEtariaAnimal(faixaCorreta);
        animalCompra.setRaca(dto.getRaca());
        animalCompra.setPorte(dto.getPorte());
        animalCompra.setSexoAnimal(dto.getSexoAnimal());
        animalCompra.setEspecie(dto.getEspecie());
        animalCompra.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalCompra.setLocalizacao(dto.getLocalizacao());
        animalCompra.setCor(dto.getCor());
        animalCompra.setVacinado(dto.getVacinado());

        if (Boolean.TRUE.equals(dto.getVacinado())) {

            if (dto.getVacinas() == null || dto.getVacinas().isEmpty()) {
               
                throw new IllegalArgumentException("Se o animal é vacinado, a lista de vacinas não pode ser vazia.");
            }
            animalCompra.setVacinas(dto.getVacinas());

        } else {
            animalCompra.setVacinas(new ArrayList<>()); 
        }

        animalCompra.setVermifugado(dto.getVermifugado());
        animalCompra.setCastrado(dto.getCastrado());
        animalCompra.setResumo(dto.getResumo());
        animalCompra.setPedigree(dto.getPedigree());
        animalCompra.setValorDoAnimal(dto.getValorDoAnimal());
        animalCompra.setFotoUrl(dto.getFotoUrl());
        animalCompra.setVideoUrl(dto.getVideoUrl());

        return animalCompraRepository.save(animalCompra);
    }

    public void excluirAnimalCompra(long id) {
        AnimalCompra animalCompra = animalCompraRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        
        if (animalCompra != null) {
            animalCompraRepository.delete(animalCompra);
        }
    }

}