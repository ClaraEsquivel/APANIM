package com.example.apanim.DTO;

import java.util.List;

import com.example.apanim.Enum.Sexo;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioCadastroDTO {
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    private Sexo sexo;

    @NotBlank(message = "O CPF é obrigatório.")
    private String cpf;

    @NotEmpty(message = "É obrigatórrio cadastrar pelo menos um telefone.")
    private List<String> telefones;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "Deve ser um e-mail válido.")
    private String email;

    @NotBlank(message = "A senha é obrigatório.")
    private String senha;

    @NotBlank(message = "O CEP é obrigatório.")
    private String cep;

    private String bairro;

    public UsuarioCadastroDTO() {
    }

    public UsuarioCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome, Sexo sexo,
            @NotBlank(message = "O CPF é obrigatório.") String cpf,
            @NotEmpty(message = "É obrigatórrio cadastrar pelo menos um telefone.") List<String> telefones,
            @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "Deve ser um e-mail válido.") String email,
            @NotBlank(message = "A senha é obrigatório.") String senha,
            @NotBlank(message = "O CEP é obrigatório.") String cep, String bairro) {
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
