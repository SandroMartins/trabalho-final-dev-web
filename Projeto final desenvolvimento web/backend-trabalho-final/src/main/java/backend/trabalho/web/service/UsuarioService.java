package backend.trabalho.web.service;

import backend.trabalho.web.model.Usuario;
import backend.trabalho.web.repository.UsuarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> buscarUsuarioPeloId(Long id) {
        Optional<Usuario> usuarioSalvo = usuarioRepository.findById(id);

        if (!usuarioSalvo.isPresent()) {
            throw new EmptyResultDataAccessException(1);
        }
        return usuarioSalvo;
    }

    public Usuario atualizar (Long id, Usuario usuario) {
        Usuario usuarioAlterado = buscarUsuarioPeloId(id).get();

        BeanUtils.copyProperties(usuario, usuarioAlterado, "id");
        return usuarioRepository.save(usuarioAlterado);
    }
}
