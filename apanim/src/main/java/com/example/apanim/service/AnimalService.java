package com.example.apanim.service;

import com.example.apanim.DTO.AnimalCadastroDTO;
import com.example.apanim.model.Animal;
import com.example.apanim.repository.AnimalRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class AnimalService {
    private AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {

        this.animalRepository = animalRepository;
    }

    public Animal salvar(AnimalCadastroDTO dto) {
        animalRepository.findById(dto.getNome())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("Animal já cadastrado.");
                });

        Animal animal = new Animal();
        animal.setNome(dto.getNome());
        animal.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        animal.setRaca(dto.getRaca());
        animal.setPorte(dto.getPorte());
        animal.setSexoAnimal(dto.getSexoAnimal());
        animal.setEspecie(dto.getEspecie());
        animal.setCondicaoEspecial(dto.getEspecie());
        



        return animalRepository.save(animal);
    }

    public List<Animal> listarTodos(){

        return animalRepository.findAll();
    }







}
