package com.example.apanim.config;

import com.example.apanim.model.Boost;
import com.example.apanim.repository.BoostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class BoostDataInitializer {

    private final BoostRepository boostRepository;

    public BoostDataInitializer(BoostRepository boostRepository) {
        this.boostRepository = boostRepository;
    }

    @Bean
    public CommandLineRunner initBoosts() {
        return args -> {
            if (boostRepository.count() == 0) {
                System.out.println("Inicializando Pacotes de Boosts...");

                Boost boost7d = new Boost(
                        "Boost de 7 Dias",
                        7,
                        new BigDecimal("29.90"),
                        "Destaque seu animal por uma semana.",
                        "BOOST-7D"
                );

                Boost boost15d = new Boost(
                        "Boost de 15 Dias",
                        15,
                        new BigDecimal("49.90"),
                        "Destaque seu animal por meio mês.",
                        "BOOST-15D"
                );

                Boost boost30d = new Boost(
                        "Boost de 30 Dias",
                        30,
                        new BigDecimal("79.90"),
                        "Destaque máximo por um mês inteiro.",
                        "BOOST-30D"
                );
                
                boostRepository.saveAll(List.of(boost7d, boost15d, boost30d));
                
                System.out.println("3 Pacotes de Boosts criados com sucesso.");
            } else {
                System.out.println("Pacotes de Boosts já existem. Inicialização ignorada.");
            }
        };
    }
}