package com.example.apanim.config;

import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.apanim.model.Plano;
import com.example.apanim.repository.PlanoRepository;

@Component
public class PlanoSeeder implements CommandLineRunner {

    private final PlanoRepository planoRepository;

    public PlanoSeeder(PlanoRepository planoRepository) {
        this.planoRepository = planoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedPlanos();
    }

    private void seedPlanos() {
        // Defina os dados dos planos em um formato limpo
        PlanoData basico = new PlanoData("Plano Básico", new BigDecimal("99.00"), "Ideal para quem está começando", "basic_gateway_id");
        PlanoData profissional = new PlanoData("Plano Profissional", new BigDecimal("199.00"), "Para vendedores ativos", "pro_gateway_id");
        PlanoData premium = new PlanoData("Plano Premium", new BigDecimal("349.00"), "Para profissionais sérios", "premium_gateway_id");

        // Tente inserir cada plano
        inserirSeNaoExiste(basico);
        inserirSeNaoExiste(profissional);
        inserirSeNaoExiste(premium);
    }

    private void inserirSeNaoExiste(PlanoData data) {
        // Verifica se o plano já existe pelo nome
        if (planoRepository.findByNome(data.nome()).isEmpty()) {
            Plano novoPlano = new Plano(
                data.nome(),
                data.preco(),
                data.descricao(),
                data.gatewayPlanId()
            );
            planoRepository.save(novoPlano);
            System.out.println("Plano inserido: " + data.nome());
        }
    }
    
    // Classe record interna para organizar os dados
    private record PlanoData(String nome, BigDecimal preco, String descricao, String gatewayPlanId) {}
}