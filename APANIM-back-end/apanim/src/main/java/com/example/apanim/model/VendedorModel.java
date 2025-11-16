package com.example.apanim.model;

import java.util.List;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tab_vendedor")
public class VendedorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

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

    public VendedorModel(Long id, String nome, Sexo sexo, String cpf, String cnpj, Integer idade,
            List<String> telefones, String email, String senha, String cep, String logradouro, String bairro) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
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

}