package com.example.apanim.Enum;

public enum SexoAnimal {
    MACHO("Macho"),
    FEMEA("Fêmea");

    private String textoAnimal;

    SexoAnimal(String textoAnimal) {
        this.textoAnimal = textoAnimal;
    }

    public String getTextoAnimal() {
        return textoAnimal;
    }
}
