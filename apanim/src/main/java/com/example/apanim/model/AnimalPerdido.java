package com.example.apanim.model;

import com.example.apanim.Enum.Sexo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "tab_animais_perdidos")
public class AnimalPerdido extends Animal {

    private LocalDate data;
    private String localDaUltimaAparicao;
    private String contato;

    public AnimalPerdido(Long id, String nome, String idadeEstimativa, String raca, String porte, Sexo sexo, String especie, String condicaoEspecial, String logradouro, String bairro, String cor, Boolean vacinado, Boolean vermifugado, Boolean castrado, String resumo, LocalDate data, String localDaUltimaAparicao, String contato) {
        super(id, nome, idadeEstimativa, raca, porte, sexo, especie, condicaoEspecial, logradouro, bairro, cor, vacinado, vermifugado, castrado, resumo);
        this.data = data;
        this.localDaUltimaAparicao = localDaUltimaAparicao;
        this.contato = contato;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getLocalDaUltimaAparicao() {
        return localDaUltimaAparicao;
    }

    public void setLocalDaUltimaAparicao(String localDaUltimaAparicao) {
        this.localDaUltimaAparicao = localDaUltimaAparicao;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    @Override
    public String toString() {
        return "AnimalPerdido{" +
                "data=" + data +
                ", localDaUltimaAparicao='" + localDaUltimaAparicao + '\'' +
                ", contato='" + contato + '\'' +
                '}';
    }
}
