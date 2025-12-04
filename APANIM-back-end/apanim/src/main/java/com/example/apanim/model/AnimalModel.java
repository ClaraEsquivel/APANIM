package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private FaixaEtariaAnimal faixaEtariaAnimal;

    private String raca;
    private String porte;

    @Enumerated(EnumType.STRING)
    private SexoAnimal sexoAnimal;

    private String especie;
    private String condicaoEspecial;
    private String localizacao;
    private String cor;
    private Boolean vacinado;
    private Boolean vermifugado;
    private Boolean castrado;

    @Column(length = 100)
    private String resumo;

    @Column(length = 1024)
    private String fotoUrl;
    
    @Column(length = 1024)
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    public AnimalModel() {
    }

    public AnimalModel(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao, String cor,
            Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, String fotoUrl, String videoUrl,
            UsuarioModel usuario) {
        this.id = id;
        this.nome = nome;
        this.faixaEtariaAnimal = faixaEtariaAnimal;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.localizacao = localizacao;
        this.cor = cor;
        this.vacinado = vacinado;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.usuario = usuario;
    }



    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public FaixaEtariaAnimal getFaixaEtariaAnimal() {
        return faixaEtariaAnimal;
    }

    public String getRaca() {
        return raca;
    }

    public String getPorte() {
        return porte;
    }

    public SexoAnimal getSexoAnimal() {
        return sexoAnimal;
    }

    public String getEspecie() {
        return especie;
    }

    public String getCondicaoEspecial() {
        return condicaoEspecial;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public String getCor() {
        return cor;
    }

    public Boolean getVacinado() {
        return vacinado;
    }

    public Boolean getVermifugado() {
        return vermifugado;
    }

    public Boolean getCastrado() {
        return castrado;
    }

    public String getResumo() {
        return resumo;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setFaixaEtariaAnimal(FaixaEtariaAnimal faixaEtariaAnimal) {
        this.faixaEtariaAnimal = faixaEtariaAnimal;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public void setPorte(String porte) {
        this.porte = porte;
    }

    public void setSexoAnimal(SexoAnimal sexoAnimal) {
        this.sexoAnimal = sexoAnimal;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public void setCondicaoEspecial(String condicaoEspecial) {
        this.condicaoEspecial = condicaoEspecial;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public void setVacinado(Boolean vacinado) {
        this.vacinado = vacinado;
    }

    public void setVermifugado(Boolean vermifugado) {
        this.vermifugado = vermifugado;
    }

    public void setCastrado(Boolean castrado) {
        this.castrado = castrado;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }
}