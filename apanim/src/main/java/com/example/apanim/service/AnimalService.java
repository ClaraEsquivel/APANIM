package com.example.apanim.service;

import com.example.apanim.DTO.AnimalCadastroDTO;
import com.example.apanim.model.AnimalModel;
import com.example.apanim.repository.AnimalRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class AnimalService {
    private AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {

        this.animalRepository = animalRepository;
    }

    public AnimalModel salvar(AnimalCadastroDTO dto) {
        Long animalId = dto.getId();

        if (animalId != null) {
            Optional<AnimalModel> animalExistente = animalRepository.findById(animalId);

            if (animalExistente.isPresent()) {
                AnimalModel animal = animalExistente.get();

                animal.setNome(dto.getNome());
                animal.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
                animal.setRaca(dto.getRaca());
                animal.setPorte(dto.getPorte());
                animal.setSexoAnimal(dto.getSexoAnimal());
                animal.setEspecie(dto.getEspecie());
                animal.setCondicaoEspecial(dto.getCondicaoEspecial());
                animal.setLogradouro(dto.getLogradouro());
                animal.setBairro(dto.getBairro());
                animal.setCor(dto.getCor());
                animal.setVacinado(dto.isVacinado());
                animal.setVermifugado(dto.isVermifugado());
                animal.setCastrado(dto.isCastrado());
                animal.setResumo(dto.getResumo());

                return animalRepository.save(animal);
            } else {
                throw new IllegalArgumentException("Animal não encontrado para o ID fornecido: " + animalId);
            }

        }

        AnimalModel novoAnimal = new AnimalModel();

        novoAnimal.setNome(dto.getNome());
        novoAnimal.setFaixaEtariaAnimal(dto.getFaixaEtariaAnimal());
        novoAnimal.setRaca(dto.getRaca());
        novoAnimal.setPorte(dto.getPorte());
        novoAnimal.setSexoAnimal(dto.getSexoAnimal());
        novoAnimal.setEspecie(dto.getEspecie());
        novoAnimal.setCondicaoEspecial(dto.getCondicaoEspecial());
        novoAnimal.setLogradouro(dto.getLogradouro());
        novoAnimal.setBairro(dto.getBairro());
        novoAnimal.setCor(dto.getCor());
        novoAnimal.setVacinado(dto.isVacinado());
        novoAnimal.setVermifugado(dto.isVermifugado());
        novoAnimal.setCastrado(dto.isCastrado());
        novoAnimal.setResumo(dto.getResumo());

        return animalRepository.save(novoAnimal);
    }


    public List<AnimalModel> listarTodos(){

        return animalRepository.findAll();
    }

}
