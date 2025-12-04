package com.example.apanim.model;

import com.example.apanim.Enum.FaixaEtariaAnimal;
import com.example.apanim.Enum.SexoAnimal;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Table(name = "tab_animais_compra")
public class AnimalCompra {

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

    @ElementCollection
    @CollectionTable(name = "tab_animal_compra_vacinas",
                    joinColumns = @JoinColumn(name = "animal_compra_id"))
    @Column(name = "vacina")
    private List<String> vacinas;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "vendedor_id", nullable = false)
    private VendedorModel vendedor;

    private Boolean pedigree;

    @Column(precision = 10, scale = 2)
    private BigDecimal valorDoAnimal;

    @Column(length = 1024)
    private String fotoUrl;
    
    @Column(length = 1024)
    private String videoUrl;

    public AnimalCompra() {
    }
    
    public AnimalCompra(Long id, String nome, FaixaEtariaAnimal faixaEtariaAnimal, String raca, String porte,
            SexoAnimal sexoAnimal, String especie, String condicaoEspecial, String localizacao,
            String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, List<String> vacinas,
            VendedorModel vendedor, Boolean pedigree, BigDecimal valorDoAnimal, String fotoUrl, String videoUrl) {
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
        this.vacinas = vacinas;
        this.vendedor = vendedor;
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

    public List<String> getVacinas() {
        return vacinas;
    }

    public VendedorModel getVendedor() {
        return vendedor;
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

    public void setVacinas(List<String> vacinas) {
        this.vacinas = vacinas;
    }

    public void setVendedor(VendedorModel vendedor) {
        this.vendedor = vendedor;
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