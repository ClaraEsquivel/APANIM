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
                    throw new IllegalArgumentException("E-mail já cadastrado.");
                });

        UsuarioModel usuario = new UsuarioModel();
        usuario.setNome(dto.getNome());
        usuario.setSexo(dto.getSexo());
        usuario.setCpf(dto.getCpf());

        if (dto.getTelefones() == null || dto.getTelefones().isEmpty()) {
            throw new IllegalArgumentException("A lista de telefones não pode ser nula ou vazia.");
        }
        usuario.setTelefones(dto.getTelefones());

        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
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
        return new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getSexo(),
            usuario.getCpf(),
            usuario.getTelefones(),
            usuario.getEmail(),
            usuario.getCep(),
            usuario.getBairro()
        );
    }

    @Transactional
    public UsuarioModel atualizar(String email, UsuarioCadastroDTO dto) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        usuario.setNome(dto.getNome());
        usuario.setSexo(dto.getSexo());
        usuario.setCpf(dto.getCpf());

        if (dto.getTelefones() == null || dto.getTelefones().isEmpty()) {
            throw new IllegalArgumentException("A lista de telefones não pode ser nula ou vazia.");
        }
        usuario.setTelefones(dto.getTelefones());
        
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        usuario.setCep(dto.getCep());
        usuario.setBairro(dto.getBairro());

        return usuarioRepository.save(usuario);
    }

    public void excluir(String email) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        if (usuario != null) {
            usuarioRepository.delete(usuario);
        }
    }


}
