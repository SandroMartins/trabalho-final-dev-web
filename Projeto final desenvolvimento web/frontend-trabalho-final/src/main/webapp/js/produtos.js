function salvar(id) {
    var qtd = document.getElementById(id).value;

    const produto = produtos.filter((produto) => {
        return produto.id == id
    });
    produto[0].quantidade = qtd;
    atualizarProduto(produto[0]);
    const usuario = {id: 1};
    cadastrarRelatorio(produto[0],usuario, qtd);
}
var produtos = [];
function atualizarProduto(produto) {
    $.ajax({
        url: 'http://localhost:8080/produtos/'+produto.id,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(produto),
        success: function (data) {
            $("#semEstoque").css({"display":"none"});
            $("#sucesso").css({"display":"block"});
            listarProdutos();
        }, error: function (err) {
            $("#semEstoque").css({"display":"block"});
            $("#sucesso").css({"display":"none"});
        }
    });
}
function listarProdutos() {
    $.ajax({
        url: 'http://localhost:8080/produtos',
        dataType: 'json',
        success: function (data) {
            $('#table-body').html("");
            produtos = data;
            $.each(data, function (idx, obj) {
                $("#table-body").append('<tr><td>'+obj.nome+'</td>' +
                    '<td><a href="'+obj.img+'" target="_blank">Exibir Produto</a></td>' +
                    '<td>'+obj.medida+'</td>' +
                    '<td>R$ '+obj.preco+'</td>' +
                    '<td>'+obj.quantidade+' unidades</td>' +
                    '<td><input type="number" id="'+obj.id +'" style="width: 80px"><button class="btn-primary" onClick="salvar(' + '\'' + obj.id + '\'' + ')">Solicitar</button></td></tr>');
            });
        }
    })
}

function cadastrarRelatorio(produto, usuario, qtd) {
    const data = {
        usuario : usuario,
        produto : produto,
        quantidade : qtd,
        valor_total : qtd * produto.preco,
        data_solicitacao : new Date().toISOString().split('T')[0]
    }
    $.ajax({
        url: 'http://localhost:8080/relatorios',
        dataType: 'json',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
        }
    });
}

$(document).ready(function () {
    listarProdutos();

});