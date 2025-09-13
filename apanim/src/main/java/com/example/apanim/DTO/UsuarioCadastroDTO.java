package com.example.apanim.DTO;

import com.example.apanim.Enum.TipoUsuario;
import jakarta.validation.constraints.*;

//record
public record UsuarioCadastroDTO(
        @NotBlank String nome,
        @NotBlank String cpf,
        String cnpj, // Opcional
        @NotBlank String telefone,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 6) String senha,
        @NotBlank String cep,
        @NotBlank String logradouro,
        @NotBlank String bairro,
        String planoDeAssinatura,
        @NotNull TipoUsuario tipo
) {}
