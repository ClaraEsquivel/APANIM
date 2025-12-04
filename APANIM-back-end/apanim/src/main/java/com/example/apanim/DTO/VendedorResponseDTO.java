package com.example.apanim.DTO;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendedorResponseDTO {
    private Long id;
    private String nome;
    private String cpf;
    private String cnpj;
    private Integer idade;
    private List<String> telefones;
    private String email;
    private String cep;
    private String logradouro;
    private String bairro;

    public VendedorResponseDTO() {
    }

    public VendedorResponseDTO(Long id, String nome, String cpf, String cnpj, Integer idade, List<String> telefones,
            String email, String cep, String logradouro, String bairro) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.idade = idade;
        this.telefones = telefones;
        this.email = email;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
    }

}
