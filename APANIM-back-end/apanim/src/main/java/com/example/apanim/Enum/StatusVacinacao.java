package com.example.apanim.Enum;

public enum StatusVacinacao {
    SIM("Sim"),
    NAO("Não"),
    NAO_SEI("Não sei");

    private final String descricao;

    StatusVacinacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    // Método para validação - considera vacinado apenas se for SIM
    public boolean isVacinado() {
        return this == SIM;
    }
}