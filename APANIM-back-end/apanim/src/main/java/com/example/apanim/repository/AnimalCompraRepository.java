package com.example.apanim.repository;

import com.example.apanim.model.AnimalCompra;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalCompraRepository extends JpaRepository<AnimalCompra, Long> {
    Optional<AnimalCompra> findByNome(String nome);
    Optional<AnimalCompra> findByNomeAndVendedorId(String nome, Long vendedorId);
  
    @Query("SELECT ap FROM AnimalCompra ap JOIN FETCH ap.vendedor")
    List<AnimalCompra> findAllWithVendedor();
}
