package com.example.apanim.service;

import com.example.apanim.dto.UsuarioCadastroDTO;
import com.example.apanim.dto.UsuarioResponseDTO;
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

    public UsuarioService(BCryptPasswordEncoder bCryptPasswordEncoder, UsuarioRepository usuarioRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioModel salvarUsuario(UsuarioCadastroDTO dto) {
        usuarioRepository.findByEmail(dto.getEmail())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("E-mail já cadastrado.");
                });
        usuarioRepository.findByCpf(dto.getCpf())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("CPF já cadastrado.");
                });

        UsuarioModel usuario = new UsuarioModel();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setCnpj(dto.getCnpj());
        usuario.setIdade(dto.getIdade());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
        usuario.setLogradouro(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());
        usuario.setPlanoAssinatura(dto.getPlanoAssinatura());
        usuario.setTipo(dto.getTipo());

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
        return new UsuarioResponseDTO(usuario.getNome(), usuario.getCpf(), usuario.getCnpj(), usuario.getIdade(), usuario.getTelefone(), usuario.getEmail(), usuario.getCep(), usuario.getLogradouro(), usuario.getBairro(), usuario.getPlanoAssinatura(), usuario.getTipo());
    }

    @Transactional
    public UsuarioModel atualizar(String email, String cpf, UsuarioCadastroDTO dto) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if(!usuario.getCpf().equals(cpf)) {
            throw new IllegalArgumentException("E-mail e CPF não correspondem ao mesmo usuário.");
        }

        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setCnpj(dto.getCnpj());
        usuario.setIdade(dto.getIdade());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
        usuario.setLogradouro(dto.getLogradouro());
        usuario.setBairro(dto.getBairro());
        usuario.setPlanoAssinatura(dto.getPlanoAssinatura());
        usuario.setTipo(dto.getTipo());

        return usuarioRepository.save(usuario);
    }

    public void excluir(String email) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        usuarioRepository.delete(usuario);
    }


}
