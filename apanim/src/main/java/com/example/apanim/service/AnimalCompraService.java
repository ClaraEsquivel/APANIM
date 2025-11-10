package com.example.apanim.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apanim.DTO.AnimalCompraCadastroDTO;
import com.example.apanim.DTO.AnimalCompraResponseDTO;
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

    public AnimalCompra salvarAnimalCompra(AnimalCompraCadastroDTO dto, Long vendedorId) {
        animalCompraRepository.findByNomeAndVendedorId(dto.getNome(), vendedorId)
            .ifPresent(animal -> {
                throw new IllegalArgumentException("Animal com esse nome já cadastrado para este vendedor.");
            });

        VendedorModel vendedor = vendedorRepository.findById(vendedorId)
            .orElseThrow(() -> new IllegalArgumentException("Vendedor não encontrado"));

        AnimalCompra animalCompra = new AnimalCompra();
        animalCompra.setNome(dto.getNome());
        animalCompra.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        animalCompra.setRaca(dto.getRaca());
        animalCompra.setPorte(dto.getPorte());
        animalCompra.setSexoAnimal(dto.getSexoAnimal());
        animalCompra.setEspecie(dto.getEspecie());
        animalCompra.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalCompra.setLogradouro(dto.getLogradouro());
        animalCompra.setBairro(dto.getBairro());
        animalCompra.setCor(dto.getCor());
        animalCompra.setVacinado(dto.getVacinado());
        animalCompra.setVermifugado(dto.getVermifugado());
        animalCompra.setCastrado(dto.getCastrado());
        animalCompra.setResumo(dto.getResumo());
        animalCompra.setVendedor(vendedor);
        animalCompra.setPedigree(dto.getPedigree());
        animalCompra.setValorDoAnimal(dto.getValorDoAnimal());

        return animalCompraRepository.save(animalCompra);
    }

    public List<AnimalCompraResponseDTO> listarAnimaisCompra() {
        return animalCompraRepository
            .findAll()
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
            animalCompra.getLogradouro(),
            animalCompra.getBairro(),
            animalCompra.getCor(),
            animalCompra.getVacinado(),
            animalCompra.getVermifugado(),
            animalCompra.getCastrado(),
            animalCompra.getResumo(),
            animalCompra.getVendedor().getId(),
            animalCompra.getPedigree(),
            animalCompra.getValorDoAnimal()
        );
    }

    @Transactional
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
        animalCompra.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        animalCompra.setRaca(dto.getRaca());
        animalCompra.setPorte(dto.getPorte());
        animalCompra.setSexoAnimal(dto.getSexoAnimal());
        animalCompra.setEspecie(dto.getEspecie());
        animalCompra.setCondicaoEspecial(dto.getCondicaoEspecial());
        animalCompra.setLogradouro(dto.getLogradouro());
        animalCompra.setBairro(dto.getBairro());
        animalCompra.setCor(dto.getCor());
        animalCompra.setVacinado(dto.getVacinado());
        animalCompra.setVermifugado(dto.getVermifugado());
        animalCompra.setCastrado(dto.getCastrado());
        animalCompra.setResumo(dto.getResumo());
        animalCompra.setPedigree(dto.getPedigree());
        animalCompra.setValorDoAnimal(dto.getValorDoAnimal());

        return animalCompraRepository.save(animalCompra);
    }

    public void excluirAnimalCompra(long id) {
        AnimalCompra animalCompra = animalCompraRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        animalCompraRepository.delete(animalCompra);
    }

}