package com.example.apanim.DTO;

import org.hibernate.validator.constraints.URL;

import com.example.apanim.Enum.SexoAnimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AnimalCadastroDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @PositiveOrZero(message = "A idade deve ser 0 ou maior.")
    private Integer idadeEmMeses;

    @NotBlank(message = "A raça é obrigatório.")
    private String raca;

    @NotBlank(message = "O porte é obrigatório.")
    private String porte;

    @NotNull(message = "O sexo é obrigatório.")
    private SexoAnimal sexoAnimal;

    @NotBlank(message = "A espécie é obrigatório.")
    private String especie;

    private String condicaoEspecial;

    @NotBlank(message = "A localização é obrigatória.")
    private String localizacao;

    @NotBlank
    private String cor;

    @NotNull
    private boolean vacinado;

    @NotNull
    private boolean vermifugado;

    @NotNull
    private boolean castrado;
    
    @Size(max = 100, message = "O resumo não pode exceder 100 caracteres.")
    private String resumo;

    @URL
    private String fotoUrl;

    @URL
    private String videoUrl;

    @NotNull 
    private Long usuarioId;

    public AnimalCadastroDTO() {
    }
    
    public AnimalCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @PositiveOrZero(message = "A idade deve ser 0 ou maior.") Integer idadeEmMeses,
            @NotBlank(message = "A raça é obrigatório.") String raca,
            @NotBlank(message = "O porte é obrigatório.") String porte,
            @NotNull(message = "O sexo é obrigatório.") SexoAnimal sexoAnimal,
            @NotBlank(message = "A espécie é obrigatório.") String especie, String condicaoEspecial,
            @NotBlank(message = "A localização é obrigatória.") String localizacao, @NotBlank String cor,
            @NotNull boolean vacinado, @NotNull boolean vermifugado, @NotNull boolean castrado,
            @Size(max = 100, message = "O resumo não pode exceder 100 caracteres.") String resumo, @URL String fotoUrl,
            @URL String videoUrl, @NotNull Long usuarioId) {
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
        this.vermifugado = vermifugado;
        this.castrado = castrado;
        this.resumo = resumo;
        this.fotoUrl = fotoUrl;
        this.videoUrl = videoUrl;
        this.usuarioId = usuarioId;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public Integer getIdadeEmMeses() { return idadeEmMeses; }
    public String getRaca() { return raca; }
    public String getPorte() { return porte; }
    public SexoAnimal getSexoAnimal() { return sexoAnimal; }
    public String getEspecie() { return especie; }
    public String getCondicaoEspecial() { return condicaoEspecial; }
    public String getLocalizacao() { return localizacao; }
    public String getCor() { return cor; }
    public boolean isVacinado() { return vacinado; }
    public boolean isVermifugado() { return vermifugado; }
    public boolean isCastrado() { return castrado; }
    public String getResumo() { return resumo; }
    public String getFotoUrl() { return fotoUrl; }
    public String getVideoUrl() { return videoUrl; }
    public Long getUsuarioId() { return usuarioId; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setIdadeEmMeses(Integer idadeEmMeses) { this.idadeEmMeses = idadeEmMeses; }
    public void setRaca(String raca) { this.raca = raca; }
    public void setPorte(String porte) { this.porte = porte; }
    public void setSexoAnimal(SexoAnimal sexoAnimal) { this.sexoAnimal = sexoAnimal; }
    public void setEspecie(String especie) { this.especie = especie; }
    public void setCondicaoEspecial(String condicaoEspecial) { this.condicaoEspecial = condicaoEspecial; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    public void setCor(String cor) { this.cor = cor; }
    public void setVacinado(boolean vacinado) { this.vacinado = vacinado; }
    public void setVermifugado(boolean vermifugado) { this.vermifugado = vermifugado; }
    public void setCastrado(boolean castrado) { this.castrado = castrado; }
    public void setResumo(String resumo) { this.resumo = resumo; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
