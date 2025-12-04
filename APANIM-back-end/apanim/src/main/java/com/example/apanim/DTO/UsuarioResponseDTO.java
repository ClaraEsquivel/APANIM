package com.example.apanim.DTO;

import java.util.List;

import com.example.apanim.Enum.Sexo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private Sexo sexo;
    private String cpf;
    private List<String> telefones;
    private String email;
    private String cep;
    private String bairro;

    public UsuarioResponseDTO() {
    }

    public UsuarioResponseDTO(Long id, String nome, Sexo sexo, String cpf, List<String> telefones, String email,
            String cep, String bairro) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.cpf = cpf;
        this.telefones = telefones;
        this.email = email;
        this.cep = cep;
        this.bairro = bairro;
    }

   

}
