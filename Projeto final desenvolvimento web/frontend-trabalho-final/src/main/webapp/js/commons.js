$(document).ready(function () {
    //Validar confirmação de senha
    $("#confirmarSenha").blur(function () {
        if ($("#confirmarSenha").val() != $("#senha").val()){
            $("#senhaNaoIgual").css({"display":"block"});
        }else {
            $("#senhaNaoIgual").css({"display":"none"});
        }
    });
    //Validar senha na hora do submit
    $("#formularioCadastro").submit(function(event){

        event.preventDefault();
        var dados = jQuery( this ).serialize();

        console.log(dados)
        if ($("#confirmarSenha").val() != $("#senha").val()){
            $("#senhaNaoIgual").css({"display":"block"});

            return;
        }else {
            $("#senhaNaoIgual").css({"display":"none"});
        }
        cadastrarUsuario();
    });
    // Busca cep quando clica no botão
    $("#botaoCep").click(function (e) {
        e.preventDefault();
        buscarCep();
    });
    // Busca cep quando saí do campo
    $("#cep").blur(function () {
        buscarCep();
    });
    // Função busca ce
    function buscarCep() {
        var cep = $("#cep").val();
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep+'/json/',
            dataType: 'json',
            success: function (data) {
                $("#cepInvalido").css({"display":"none"});
                $("#logradouro").val(data.logradouro);
                $("#cidade").val(data.localidade);
                $("#estado").val(data.uf);

            },
            error: function () {
                $("#cepInvalido").css({"display":"block"});
            }
        })
    }
    $("#data_nascimento").blur(function () {
        idade();
    })
    function idade() {
        var today = new Date();
        var birthDate = new Date($("#data_nascimento").val());
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        $("#idade").text("Idade: " + age + " anos");
    }

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            if (n['name'] != 'confirmarSenha') {
                indexed_array[n['name']] = n['value'];
            }
        });

        return indexed_array;
    }

    function cadastrarUsuario() {
        console.log(getFormData($("#formularioCadastro")));
        $.ajax({
            url: 'http://localhost:8080/usuarios',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(getFormData($("#formularioCadastro"))),
            success: function (data) {
                $("#formularioCadastro")[0].reset();
                window.location = "index.html";
            }
        })
    }


    $("#Formlogin").submit(function (e) {
        e.preventDefault();

        const logar = {

            login: $("#login").val(),
            senha: $("#senha").val()
        }
        console.log(logar)
        $.ajax({
            url: 'http://localhost:8080/login',
            type: 'POST',
            contentType: 'application/json',

            data: JSON.stringify(logar),
            success: function (data, textStatus, request) {
                $("#loginInvalido").css({"display":"none"});
                window.location = "listar-produto.html";

            },
            error: function (er, textStatus, request) {
                $("#loginInvalido").css({"display":"block"});
                console.log(er);
            }
        })
    })
});

