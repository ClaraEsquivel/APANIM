package com.example.apanim.service;

import com.example.apanim.exception.CpfJaCadastradoException;
import com.example.apanim.exception.EmailJaCadastradoException;
import com.example.apanim.model.UsuarioModel;
import com.example.apanim.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class UsuarioService {
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioModel> listarTodos() {

        return usuarioRepository.findAll();
    }

    public UsuarioModel salvar(@Valid UsuarioModel usuarioModel) {
        if(usuarioRepository.findByEmail(usuarioModel.getEmail()).isPresent()) {
            throw new EmailJaCadastradoException("Usuário já cadastrado.");
        }
        /*else if(usuarioRepository.findByCpf(usuarioModel.getCpf()).isPresent()) {
            throw new CpfJaCadastradoException("Usuário já cadastrado.");
        }*/

        return usuarioRepository.save(usuarioModel);
    }
}
