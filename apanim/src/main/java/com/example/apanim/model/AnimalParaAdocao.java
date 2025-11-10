package com.example.apanim.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tab-animais-adocao")
public class AnimalParaAdocao extends AnimalModel {

    public AnimalParaAdocao() {
    }


}