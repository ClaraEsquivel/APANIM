package com.example.apanim.service;

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

    public List<Animal> listarTodos(){
        return animalRepository.findAll();
    }

    public Animal salvar(@Valid Animal animal) {
        return animalRepository.save(animal);
    }




}
