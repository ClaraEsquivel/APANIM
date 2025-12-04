package com.example.apanim.repository;

import com.example.apanim.model.Plano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlanoRepository extends JpaRepository<Plano, Long> {
    Optional<Plano> findByNome(String nome);
    Optional<Plano> findByGatewayPlanId(String gatewayPlanId);
}