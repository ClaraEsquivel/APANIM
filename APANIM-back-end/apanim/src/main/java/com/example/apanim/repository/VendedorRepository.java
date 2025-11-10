package com.example.apanim.repository;

import com.example.apanim.model.VendedorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendedorRepository extends JpaRepository<VendedorModel, Long> {
    Optional<VendedorModel> findByEmail(String email);
    Optional<VendedorModel> findByCpf(String cpf);
}
