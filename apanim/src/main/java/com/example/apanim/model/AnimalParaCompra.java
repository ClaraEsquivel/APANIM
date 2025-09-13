package com.example.apanim.model;

import com.example.apanim.Enum.PlanoAssinatura;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tab_animais_compra")
public class AnimalParaCompra extends Animal {

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    @Enumerated(EnumType.STRING)
    private PlanoAssinatura planoAssinatura;
}