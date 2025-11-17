package com.example.apanim.DTO;

import com.example.apanim.Enum.StatusAssinatura;
import com.example.apanim.model.Assinatura;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class AssinaturaResponseDTO {
    private Long id;
    private StatusAssinatura status;
    private LocalDate dataDeExpiracao;
    private PlanoResponseDTO plano;
    private Long usuarioId;

    public AssinaturaResponseDTO(Assinatura assinatura) {
        this.id = assinatura.getId();
        this.status = assinatura.getStatus();
        this.dataDeExpiracao = assinatura.getDataDeExpiracao();
        this.plano = new PlanoResponseDTO(assinatura.getPlano());
        this.usuarioId = assinatura.getUsuario().getId();
    }
}