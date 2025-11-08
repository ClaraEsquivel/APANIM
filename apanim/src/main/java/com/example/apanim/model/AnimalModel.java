package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tab_animais")
@Inheritance(strategy = InheritanceType.JOINED)
public class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private FaixaEtariaAnimal faixaEtariaAnimal;

    private String raca;

    private String porte;

    @Enumerated(EnumType.STRING)
    private SexoAnimal sexoAnimal;

    private String especie;

    private String condicaoEspecial;

    private String logradouro;

    private String bairro;

    private String cor;

    @NotNull
    private Boolean vacinado;

    @NotNull
    private Boolean vermifugado;

    @NotNull
    private Boolean castrado;

    @Lob
    private String resumo;

    public AnimalModel() {
    }

    public AnimalModel(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte, SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo) {
        this.id = id;
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cor = cor;
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank String getNome() {
        return nome;
    }

    public void setNome(@NotBlank String nome) {
        this.nome = nome;
    }

    public FaixaEtariaAnimal getFaixaEtariaAnimal() {
        return faixaEtariaAnimal;
    }

    public void setFaixaEtariaAnimal(FaixaEtariaAnimal faixaEtariaAnimal) {
        this.faixaEtariaAnimal = faixaEtariaAnimal;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public String getPorte() {
        return porte;
    }

    public void setPorte(String porte) {
        this.porte = porte;
    }

    public SexoAnimal getSexoAnimal() {
        return sexoAnimal;
    }

    public void setSexoAnimal(SexoAnimal sexoAnimal) {
        this.sexoAnimal = sexoAnimal;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getCondicaoEspecial() {
        return condicaoEspecial;
    }

    public void setCondicaoEspecial(String condicaoEspecial) {
        this.condicaoEspecial = condicaoEspecial;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public @NotNull Boolean getVacinado() {
        return vacinado;
    }

    public void setVacinado(@NotNull Boolean vacinado) {
        this.vacinado = vacinado;
    }

    public @NotNull Boolean getVermifugado() {
        return vermifugado;
    }

    public void setVermifugado(@NotNull Boolean vermifugado) {
        this.vermifugado = vermifugado;
    }

    public @NotNull Boolean getCastrado() {
        return castrado;
    }

    public void setCastrado(@NotNull Boolean castrado) {
        this.castrado = castrado;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }
}