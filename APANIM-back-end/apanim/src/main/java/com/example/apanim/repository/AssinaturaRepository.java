package com.example.apanim.repository;

import com.example.apanim.Enum.StatusAssinatura;
import com.example.apanim.model.Assinatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssinaturaRepository extends JpaRepository<Assinatura, Long> {
    Optional<Assinatura> findByUsuarioId(Long usuarioId);
    Optional<Assinatura> findByUsuarioIdAndStatus(Long usuarioId, StatusAssinatura status);
    List<Assinatura> findByStatusAndDataDeExpiracaoBefore(StatusAssinatura status, LocalDate hoje);
}