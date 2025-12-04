package com.example.apanim.DTO;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.validator.constraints.URL;

import com.example.apanim.Enum.SexoAnimal;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class AnimalCompraCadastroDTO {
    
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotNull(message = "A idade em meses é obrigatória.")
    @PositiveOrZero(message = "A idade deve ser 0 ou maior.")
    private Integer idadeEmMeses;

    @NotBlank(message = "A raça é obrigatória.")
    private String raca;

    @NotBlank(message = "O porte é obrigatório.")
    private String porte;

    @NotNull(message = "O sexo é obrigatório.")
    private SexoAnimal sexoAnimal;

    @NotBlank(message = "A espécie é obrigatória.")
    private String especie;

    private String condicaoEspecial;

    @NotBlank(message = "A localização é obrigatória.")
    private String localizacao;

    @NotBlank
    private String cor;

    @NotNull
    private Boolean vacinado;
    
    private List<String> vacinas;

    @NotNull
    private Boolean vermifugado;
    
    @NotNull
    private Boolean castrado;

    @Size(max = 100, message = "O resumo não pode exceder 100 caracteres.")
    private String resumo;

    @NotNull
    private Long vendedorId;

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    @URL
    @NotBlank
    private String fotoUrl;

    @URL
    private String videoUrl;

    public AnimalCompraCadastroDTO() {
    }

    public AnimalCompraCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @NotNull(message = "A idade em meses é obrigatória.") @PositiveOrZero(message = "A idade deve ser 0 ou maior.") Integer idadeEmMeses,
            @NotBlank(message = "A raça é obrigatória.") String raca,
            @NotBlank(message = "O porte é obrigatório.") String porte,
            @NotNull(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal,
            @NotBlank(message = "A espécie é obrigatória.") String especie, String condicaoEspecial,
            @NotBlank(message = "A localização é obrigatória.") String localizacao, @NotBlank String cor,
            @NotNull Boolean vacinado, List<String> vacinas, @NotNull Boolean vermifugado, @NotNull Boolean castrado,
            @Size(max = 100, message = "O resumo não pode exceder 100 caracteres.") String resumo,
            @NotNull Long vendedorId, Boolean pedigree, BigDecimal valorDoAnimal, @URL @NotBlank String fotoUrl,
            @URL String videoUrl) {
        this.id = id;
        this.nome = nome;
        this.idadeEmMeses = idadeEmMeses;
        this.raca = raca;
        this.porte = porte;
        this.sexoAnimal = sexoAnimal;
        this.especie = especie;
        this.condicaoEspecial = condicaoEspecial;
        this.localizacao = localizacao;
        this.cor = cor;
        this.vacinado = vacinado;
        this.vacinas = vacinas;
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.vendedorId = vendedorId;
        this.pedigree = pedigree;
        this.valorDoAnimal = valorDoAnimal;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Integer getIdadeEmMeses() {
        return idadeEmMeses;
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

    public List<String> getVacinas() {
        return vacinas;
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

    public Long getVendedorId() {
        return vendedorId;
    }

    public Boolean getPedigree() {
        return pedigree;
    }

    public BigDecimal getValorDoAnimal() {
        return valorDoAnimal;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setIdadeEmMeses(Integer idadeEmMeses) {
        this.idadeEmMeses = idadeEmMeses;
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

    public void setVacinas(List<String> vacinas) {
        this.vacinas = vacinas;
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

    public void setVendedorId(Long vendedorId) {
        this.vendedorId = vendedorId;
    }

    public void setPedigree(Boolean pedigree) {
        this.pedigree = pedigree;
    }

    public void setValorDoAnimal(BigDecimal valorDoAnimal) {
        this.valorDoAnimal = valorDoAnimal;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
