package com.example.apanim.repository;

import com.example.apanim.model.AnimalAdocao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalAdocaoRepository extends JpaRepository<AnimalAdocao, Long> {
    Optional<AnimalAdocao> findByNome(String nome);
    Optional<AnimalAdocao> findByNomeAndUsuarioId(String nome, Long usuarioId);

    @Query("SELECT ap FROM AnimalAdocao ap JOIN FETCH ap.usuario")
    List<AnimalAdocao> findAllWithUsuario();
}
