package backend.trabalho.web.resource;
import backend.trabalho.web.model.Produto;
import backend.trabalho.web.model.Relatorio;
import backend.trabalho.web.repository.RelatorioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/relatorios")
public class RelatorioResource {

    @Autowired
    private RelatorioRepository relatorioRepository;

    @GetMapping
    public List<Relatorio> listar() {
        return relatorioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Relatorio> criar(@Valid @RequestBody Relatorio relatorio, HttpServletResponse response) {
        Relatorio relatorioSalvo = relatorioRepository.save(relatorio);
        return ResponseEntity.status(HttpStatus.CREATED).body(relatorioSalvo);
    }
}
