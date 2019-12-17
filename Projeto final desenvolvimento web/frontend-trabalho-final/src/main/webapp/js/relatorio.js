$(document).ready(function () {
    relatorio();

});

function relatorio() {
    $.ajax({
        url: 'http://localhost:8080/relatorios',
        dataType: 'json',
        success: function (data) {
            $('#table-body').html("");
            relatorios = data;
            var total = 0;
            $.each(data, function (idx, obj) {

             total+=obj.valor_total;
                $("#table-body").append('<tr><td>'+obj.usuario.nome+'</td>' +
                    '<td>'+obj.data_solicitacao+'</td>' +
                    '<td>'+obj.produto.nome+'</td>' +
                    '<td>'+obj.quantidade+'</td>' +
                    '<td>'+obj.valor_total+'</td></tr>');
            });
            $("#total").text("Valor Total: R$ " + total.toFixed(2));
            $("#total").css({"margin-left":"85%"});
            console.log(total);
        }
    })
}