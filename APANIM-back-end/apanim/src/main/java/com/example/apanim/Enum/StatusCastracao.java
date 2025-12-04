package com.example.apanim.Enum;

public enum StatusCastracao {
    SIM("Sim"),
    NAO("Não"),
    NAO_SEI("Não sei");

    private final String descricao;

    StatusCastracao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
