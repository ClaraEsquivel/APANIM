package com.example.apanim.service;

import com.example.apanim.DTO.UsuarioCadastroDTO;
import com.example.apanim.DTO.UsuarioResponseDTO;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public UsuarioModel salvarUsuario(UsuarioCadastroDTO dto) {
        usuarioRepository.findByEmail(dto.getEmail())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("CPF já cadastrado.");
                });

        UsuarioModel usuario = new UsuarioModel();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
        usuario.setLogradouro(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());

        return usuarioRepository.save(usuario);
    }

    public List<UsuarioResponseDTO> listarTodosUsuarios() {
        return usuarioRepository
                .findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UsuarioResponseDTO toDTO(UsuarioModel usuario) {
        return new UsuarioResponseDTO(usuario.getNome(), usuario.getCpf(), usuario.getTelefone(), usuario.getEmail(), usuario.getSenha(), usuario.getCep(), usuario.getLogradouro(), usuario.getBairro());
    }

    @Transactional
    public UsuarioModel atualizar(String email, UsuarioCadastroDTO dto) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
        usuario.setLogradouro(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());

        return usuarioRepository.save(usuario);
    }

    public void excluir(String email) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        usuarioRepository.delete(usuario);
    }


}
