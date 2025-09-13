package com.example.apanim.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "tab_animais_perdidos")
public class AnimalPerdido extends Animal {

    private LocalDate data;
    private String localDaUltimaAparicao;
    private String contato;
}
