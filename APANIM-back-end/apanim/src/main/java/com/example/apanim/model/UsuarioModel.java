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

}
