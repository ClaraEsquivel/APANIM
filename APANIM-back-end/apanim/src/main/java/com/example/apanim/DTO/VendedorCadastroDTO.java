package com.example.apanim.DTO;

import java.util.List;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendedorCadastroDTO {
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório.")
    private String cpf;

    private String cnpj;

    @NotNull
    private Integer idade;

    @NotEmpty(message = "É obrigatório cadastrar pelo menos um telefone.")
    private List<String> telefones;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "Deve ser um email válido.")
    private String email;

    @NotBlank(message = "Senha é obrigatório.")
    private String senha;

    @NotBlank(message = "O CEP é obrigatório.")
    private String cep;

    private String logradouro;

    private String bairro;

    public VendedorCadastroDTO() {
    }

    public VendedorCadastroDTO(Long id, @NotBlank(message = "O nome é obrigatório.") String nome,
            @NotBlank(message = "O CPF é obrigatório.") String cpf, String cnpj, @NotNull Integer idade,
            @NotEmpty(message = "É obrigatório cadastrar pelo menos um telefone.") List<String> telefones,
            @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "Deve ser um email válido.") String email,
            @NotBlank(message = "Senha é obrigatório.") String senha,
            @NotBlank(message = "O CEP é obrigatório.") String cep, String logradouro, String bairro) {
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

    
}
