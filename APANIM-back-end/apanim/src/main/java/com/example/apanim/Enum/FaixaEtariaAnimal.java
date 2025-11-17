package com.example.apanim.Enum;

public enum FaixaEtariaAnimal {
    FILHOTE("Filhote", 0, 12, true),
    ADULTO("Adulto", 13, 84, false),
    IDOSO("Idoso", 85, 240, false);

    private final String descricao;
    private final int idadeMinimaMeses;
    private final int idadeMaximaMeses;
    private final boolean exibirEmMeses;

    FaixaEtariaAnimal(String descricao, int idadeMinimaMeses, int idadeMaximaMeses, boolean exibirEmMeses) {
        this.descricao = descricao;
        this.idadeMinimaMeses = idadeMinimaMeses;
        this.idadeMaximaMeses = idadeMaximaMeses;
        this.exibirEmMeses = exibirEmMeses;
    }

    public String getDescricao() {
        return descricao;
    }

    public boolean isExibirEmMeses() {
        return exibirEmMeses;
    }

    public static FaixaEtariaAnimal fromIdadeMeses(int idadeEmMeses) {
        for (FaixaEtariaAnimal faixa : FaixaEtariaAnimal.values()) {
            if (idadeEmMeses >= faixa.idadeMinimaMeses && idadeEmMeses <= faixa.idadeMaximaMeses) {
                return faixa;
            }
        }
        throw new IllegalArgumentException("Idade fora das faixas definidas: " + idadeEmMeses);
    }

    public String getIdadeFormatada(int idadeEmMeses) {
        if (exibirEmMeses) {
            return idadeEmMeses + " meses";
        } else {
            return (idadeEmMeses / 12) + " anos";
        }
    }
}
