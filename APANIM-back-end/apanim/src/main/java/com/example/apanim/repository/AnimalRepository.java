package com.example.apanim.repository;

import com.example.apanim.model.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    Optional<AnimalModel> findByNome(String nome);
    Optional<AnimalModel> findByNomeAndUsuarioId(String nome, Long usuarioId);
}
