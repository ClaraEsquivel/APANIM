package com.example.apanim.repository;

import com.example.apanim.model.AnimalCompra;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalCompraRepository extends JpaRepository<AnimalCompra, Long> {
    Optional<AnimalCompra> findByNome(String nome);
    Optional<AnimalCompra> findByNomeAndVendedorId(String nome, Long vendedorId);
    
}
