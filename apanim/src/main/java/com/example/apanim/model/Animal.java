package com.example.apanim.model;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tab_animais")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String idadeEstimativa;

    private String raca;

    private String porte;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

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

    public Animal() {
    }

    public Animal(Long id, String nome, String idadeEstimativa, String raca, String porte, Sexo sexo, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo) {
        this.id = id;
        this.nome = nome;
        this.idadeEstimativa = idadeEstimativa;
        this.raca = raca;
        this.porte = porte;
        this.sexo = sexo;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIdadeEstimativa() {
        return idadeEstimativa;
    }

    public void setIdadeEstimativa(String idadeEstimativa) {
        this.idadeEstimativa = idadeEstimativa;
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

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
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

    public Boolean getVacinado() {
        return vacinado;
    }

    public void setVacinado(Boolean vacinado) {
        this.vacinado = vacinado;
    }

    public Boolean getVermifugado() {
        return vermifugado;
    }

    public void setVermifugado(Boolean vermifugado) {
        this.vermifugado = vermifugado;
    }

    public Boolean getCastrado() {
        return castrado;
    }

    public void setCastrado(Boolean castrado) {
        this.castrado = castrado;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

}