package com.example.apanim.repository;

import com.example.apanim.model.Boost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoostRepository extends JpaRepository<Boost, Long> {
    Optional<Boost> findByNome(String nome);
}