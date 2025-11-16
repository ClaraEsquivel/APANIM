package com.example.apanim.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.apanim.model.AnimalPerdido;

@Repository
public interface AnimalPerdidoRepository extends JpaRepository<AnimalPerdido, Long> {
    Optional<AnimalPerdido> findByNome(String nome);
    Optional<AnimalPerdido> findByNomeAndUsuarioId(String nome, Long usuarioId);

    @Query("SELECT ap FROM AnimalPerdido ap JOIN FETCH ap.usuario")
    List<AnimalPerdido> findAllWithUsuario();
}
