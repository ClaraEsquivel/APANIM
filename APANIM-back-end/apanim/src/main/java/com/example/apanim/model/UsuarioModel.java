package com.example.apanim.model;

import java.util.List;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tab_usuarios")
public class UsuarioModel {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Column(unique = true)
    private String cpf;

    @ElementCollection
    @CollectionTable(name = "tab_usuario_telefones", 
                     joinColumns = @JoinColumn(name = "usuario_id")) 
    @Column(name = "telefone") 
    private List<String> telefones;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String cep;
    private  String bairro;

    public UsuarioModel() {
    }

    public UsuarioModel(Long id, String nome, Sexo sexo, String cpf, List<String> telefones, String email, String senha,
            String cep, String bairro) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.cpf = cpf;
        this.telefones = telefones;
        this.email = email;
        this.senha = senha;
        this.cep = cep;
        this.bairro = bairro;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public Sexo getSexo() { return sexo; }
    public String getCpf() { return cpf; }
    public List<String> getTelefones() { return telefones; }
    public String getEmail() { return email; }
    public String getSenha() { return senha; }
    public String getCep() { return cep; }
    public String getBairro() { return bairro; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setSexo(Sexo sexo) { this.sexo = sexo; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public void setTelefones(List<String> telefones) { this.telefones = telefones; }
    public void setEmail(String email) { this.email = email; }
    public void setSenha(String senha) { this.senha = senha; }
    public void setCep(String cep) { this.cep = cep; }
    public void setBairro(String bairro) { this.bairro = bairro; }
}
