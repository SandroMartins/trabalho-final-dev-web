package backend.trabalho.web.resource;
import backend.trabalho.web.model.Produto;
import backend.trabalho.web.repository.ProdutoRepository;
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
@RequestMapping("/produtos")
public class ProdutoResource {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@Valid @RequestBody Produto produto, HttpServletResponse response) {
        Produto produtoSalvo = produtoRepository.save(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
    }
    @GetMapping("/{codigo}")
    public ResponseEntity buscarPeloCodigo(@PathVariable Long codigo) {
        return this.produtoRepository.findById(codigo).map(produto -> ResponseEntity.ok(produto))
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{codigo}")
    public ResponseEntity<Object> atualizar(@PathVariable Long codigo, @Valid @RequestBody Produto produto) {
        Produto prod = produtoRepository.findById(codigo).get();
        if(prod == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Produto inválido.");
        }
        if(prod.getQuantidade() >= produto.getQuantidade()) {
            produto.setQuantidade(prod.getQuantidade() - produto.getQuantidade());

            BeanUtils.copyProperties(produto, prod, "id");
            produtoRepository.save(prod);
            return ResponseEntity.status(HttpStatus.CREATED).body(prod);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem estoque");
        }

    }

}
