package com.example.apanim.service;

import com.example.apanim.DTO.VendedorCadastroDTO;
import com.example.apanim.DTO.VendedorResponseDTO;
import com.example.apanim.model.VendedorModel;
import com.example.apanim.repository.VendedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendedorService {
    private VendedorRepository vendedorRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public VendedorService(BCryptPasswordEncoder bCryptPasswordEncoder, VendedorRepository vendedorRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.vendedorRepository = vendedorRepository;
    }

    public VendedorModel salvarVendedor(VendedorCadastroDTO dto) {
        vendedorRepository.findByEmail(dto.getEmail())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("E-mail já cadastrado.");
                });
        vendedorRepository.findByCpf(dto.getCpf())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("CPF já cadastrado.");
                });

        VendedorModel vendedor = new VendedorModel();
        vendedor.setNome(dto.getNome());
        vendedor.setCpf(dto.getCpf());
        vendedor.setCnpj(dto.getCnpj());
        vendedor.setIdade(dto.getIdade());
        vendedor.setTelefone(dto.getTelefone());
        vendedor.setEmail(dto.getEmail());
        vendedor.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        vendedor.setCep(dto.getCep());
        vendedor.setLogradouro(dto.getLogradouro());
        vendedor.setBairro(dto.getBairro());

        return vendedorRepository.save(vendedor);
    }

    public List<VendedorResponseDTO> listarTodosVendedores() {
        return vendedorRepository
                .findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public VendedorResponseDTO toDTO(VendedorModel vendedor) {
        return new VendedorResponseDTO(vendedor.getNome(), vendedor.getCpf(), vendedor.getCnpj(), vendedor.getIdade(), vendedor.getTelefone(), vendedor.getEmail(), vendedor.getCep(), vendedor.getLogradouro(), vendedor.getBairro());
    }

    @Transactional
    public VendedorModel atualizar(String email, String cpf, VendedorCadastroDTO dto) {
        VendedorModel vendedor = vendedorRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if(!vendedor.getCpf().equals(cpf)) {
            throw new IllegalArgumentException("E-mail e CPF não correspondem ao mesmo usuário.");
        }

        vendedor.setNome(dto.getNome());
        vendedor.setCpf(dto.getCpf());
        vendedor.setCnpj(dto.getCnpj());
        vendedor.setIdade(dto.getIdade());
        vendedor.setTelefone(dto.getTelefone());
        vendedor.setEmail(dto.getEmail());
        vendedor.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        vendedor.setCep(dto.getCep());
        vendedor.setLogradouro(dto.getLogradouro());
        vendedor.setBairro(dto.getBairro());

        return vendedorRepository.save(vendedor);
    }

    public void excluir(String email) {
        VendedorModel vendedor = vendedorRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        vendedorRepository.delete(vendedor);
    }

}
