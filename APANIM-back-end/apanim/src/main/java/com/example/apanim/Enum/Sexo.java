package com.example.apanim.Enum;

public enum Sexo {
        MASCULINO("Masculino"),
        FEMININO("Feminino");

        private String texto;

        Sexo(String texto) {
                this.texto = texto;
        }

        public String getTexto() {
                return texto;
        }
}
