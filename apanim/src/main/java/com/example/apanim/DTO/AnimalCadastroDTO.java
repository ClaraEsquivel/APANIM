package com.example.apanim.DTO;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.validation.constraints.NotBlank;

public class AnimalCadastroDTO {
    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotBlank(message = "A Faixa Etária é obrigatório.")
    private FaixaEtariaAnimal faixaEtariaAnimal;

    @NotBlank(message = "A raça é obrigatório.")
    private String raca;

    @NotBlank(message = "O porte é obrigatório.")
    private String porte;

    @NotBlank(message = "O sexo é obrigatório.")
    private SexoAnimal sexoAnimal;

    @NotBlank(message = "A espécie é obrigatório.")
    private String especie;

    @NotBlank(message = "O bairro é obrigatório.")
    private String bairro;

    @NotBlank
    private boolean vacinado;

    @NotBlank
    private boolean vermifugado;

    @NotBlank
    private boolean castrado;

    public AnimalCadastroDTO() {
    }

    public AnimalCadastroDTO(String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String bairro, boolean vacinado, boolean vermifugado, boolean castrado) {
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.bairro = bairro;
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
    }

    public @NotBlank(message = "O nome é obrigatório.") String getNome() {
        return nome;
    }

    public void setNome(@NotBlank(message = "O nome é obrigatório.") String nome) {
        this.nome = nome;
    }

    public @NotBlank(message = "A Faixa Etária é obrigatório.") FaixaEtariaAnimal getFaixaEtariaAnimal() {
        return faixaEtariaAnimal;
    }

    public void setFaixaEtariaAnimal(@NotBlank(message = "A Faixa Etária é obrigatório.") FaixaEtariaAnimal faixaEtariaAnimal) {
        this.faixaEtariaAnimal = faixaEtariaAnimal;
    }

    public @NotBlank(message = "A raça é obrigatório.") String getRaca() {
        return raca;
    }

    public void setRaca(@NotBlank(message = "A raça é obrigatório.") String raca) {
        this.raca = raca;
    }

    public @NotBlank(message = "O porte é obrigatório.") String getPorte() {
        return porte;
    }

    public void setPorte(@NotBlank(message = "O porte é obrigatório.") String porte) {
        this.porte = porte;
    }

    public @NotBlank(message = "O sexo é obrigatório.") SexoAnimal getSexoAnimal() {
        return sexoAnimal;
    }

    public void setSexoAnimal(@NotBlank(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal) {
        this.sexoAnimal = sexoAnimal;
    }

    public @NotBlank(message = "A espécie é obrigatório.") String getEspecie() {
        return especie;
    }

    public void setEspecie(@NotBlank(message = "A espécie é obrigatório.") String especie) {
        this.especie = especie;
    }

    public @NotBlank(message = "O bairro é obrigatório.") String getBairro() {
        return bairro;
    }

    public void setBairro(@NotBlank(message = "O bairro é obrigatório.") String bairro) {
        this.bairro = bairro;
    }

    @NotBlank
    public boolean isVacinado() {
        return vacinado;
    }

    public void setVacinado(@NotBlank boolean vacinado) {
        this.vacinado = vacinado;
    }

    @NotBlank
    public boolean isVermifugado() {
        return vermifugado;
    }

    public void setVermifugado(@NotBlank boolean vermifugado) {
        this.vermifugado = vermifugado;
    }

    @NotBlank
    public boolean isCastrado() {
        return castrado;
    }

    public void setCastrado(@NotBlank boolean castrado) {
        this.castrado = castrado;
    }
}
