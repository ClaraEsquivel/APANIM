package com.example.apanim.Enum;

public enum StatusVermifugacao {
    SIM("Sim"),
    NAO("Não"),
    NAO_SEI("Não sei");

    private final String descricao;

    StatusVermifugacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}