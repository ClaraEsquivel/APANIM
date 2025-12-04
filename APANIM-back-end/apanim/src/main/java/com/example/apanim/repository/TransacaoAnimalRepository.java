package com.example.apanim.repository;

import com.example.apanim.model.TransacaoAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransacaoAnimalRepository extends JpaRepository<TransacaoAnimal, Long> {
    Optional<TransacaoAnimal> findByGatewayTransactionId(String gatewayTransactionId);
}