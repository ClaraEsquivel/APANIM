package com.example.apanim.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "tab_vendedor")
public class VendedorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true)
    private String cpf;

    @Column(unique = true)
    private String cnpj;

    private Integer idade;
    
    @ElementCollection
    @CollectionTable(name = "tab_vendedor_telefones",
                    joinColumns = @JoinColumn(name = "vendedor_id"))
    @Column(name = "telefone")
    private List<String> telefones;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String cep;

    private String logradouro;

    private String bairro;

    public VendedorModel() {
    }

    public VendedorModel(Long id, String nome, String cpf, String cnpj, Integer idade, List<String> telefones,
            String email, String senha, String cep, String logradouro, String bairro) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.idade = idade;
        this.telefones = telefones;
        this.email = email;
        this.senha = senha;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public String getCnpj() {
        return cnpj;
    }

    public Integer getIdade() {
        return idade;
    }

    public List<String> getTelefones() {
        return telefones;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public String getCep() {
        return cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public void setTelefones(List<String> telefones) {
        this.telefones = telefones;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
}