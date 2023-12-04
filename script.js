function ValidaNivel() {
    var nivel = $("#nivel").val();
    nivel = parseInt(nivel);
    if (nivel < 1 || nivel > 300) {
        alert("Nivel inválido!! Apenas permitido de 1 a 300.");
        $("#nivel").val("");
    }
}

function criarTabela(dados) {
    var tabela = $("<table></table>");
    tabela.addClass("table table-striped");
    var thead = $("<thead></thead>");
    var tr = $("<tr></tr>");

    var thNome = $("<th></th>").text("Nome de usuário");
    var thNivel = $("<th></th>").text("Nível do jogador");
    var thRegiao = $("<th></th>").text("Região do Brasil");
    var thPersonagem = $("<th></th>").text("Personagem");

    tr.append(thNome, thNivel, thRegiao, thPersonagem);

    thead.append(tr);

    var tbody = $("<tbody></tbody>");

    for (var i = 0; i < dados.length; i++) {

        var usuario = dados[i];

        var tr = $("<tr></tr>");

        var tdNome = $("<td></td>").text(usuario.nome);
        var tdNivel = $("<td></td>").text(usuario.nivel);
        var tdRegiao = $("<td></td>").text(usuario.regiao);
        var tdPersonagem = $("<td></td>").text(usuario.personagem);

        tr.append(tdNome, tdNivel, tdRegiao, tdPersonagem);

        tbody.append(tr);
    }

    tabela.append(thead, tbody);

    return tabela;
}


function gravarUsuario(usuario, nome) {
    var dados = localStorage.getItem("dados");
    if (dados == null) {
        dados = [];
    } else {
        dados = JSON.parse(dados);
        for (var i = 0; i < dados.length; i++) {
            var usuario1 = dados[i];
            if (usuario1.nome == nome) {
                return false;
            }
        }
    }
    dados.push(usuario);
    var json = JSON.stringify(dados);
    localStorage.setItem("dados", json);
    return true;
}


function listarUsuarios() {

    var dados = localStorage.getItem("dados");

    if (dados == null) {

        return [];
    } else {

        dados = JSON.parse(dados);

        return dados;
    }
}


function deletarUsuario(nome, senha) {

    var dados = localStorage.getItem("dados");

    if (dados == null) {

        return false;
    } else {

        dados = JSON.parse(dados);

        for (var i = 0; i < dados.length; i++) {

            var usuario = dados[i];

            if (usuario.nome == nome) {
                if (usuario.senha == senha) {

                    dados.splice(i, 1);

                    var json = JSON.stringify(dados);

                    localStorage.setItem("dados", json);

                    return true;
                } else {
                    alert("Digite a senha correta para efetuar a deleção.")
                }
            }
        }

        return false;
    }
}


function buscarUsuario(nome) {

    var dados = localStorage.getItem("dados");

    if (dados == null) {

        return null;
    } else {

        dados = JSON.parse(dados);

        for (var i = 0; i < dados.length; i++) {

            var usuario = dados[i];

            if (usuario.nome == nome) {

                return usuario;
            }
        }

        return null;
    }
}


$("#btn-gravar").click(function () {

    var nome = $("#nome").val();
    var nivel = $("#nivel").val();
    var regiao = $("#regiao").val();
    var personagem = $("#personagem").val();
    var senha = $("#senha").val();


    if (nome == "" || nivel == "" || regiao == "" || personagem == "" || senha == "") {

        alert("Por favor, preencha todos os campos.");

        return;
    } else if (senha.length < 8) {
        alert("A senha deve conter no mínimo 8 caracteres");
        return;
    }




    var usuario = {
        nome: nome,
        nivel: nivel,
        regiao: regiao,
        personagem: personagem,
        senha: senha

    };


    var gravar = gravarUsuario(usuario, nome);

    if (gravar) {
        alert("Usuário cadastrado com sucesso.");
    } else {
        alert("Nome de usuário já existente. Falha no cadastro!")
    }


    $("#nome").val("");
    $("#nivel").val("");
    $("#regiao").val("");
    $("#personagem").val("");
    $("#senha").val("");

    $("#resultado").empty();
});


$("#btn-listar").click(function () {

    var dados = listarUsuarios();

    if (dados.length == 0) {

        alert("Não há usuários cadastrados.");

        return;
    }

    var tabela = criarTabela(dados);

    $("#resultado").empty();

    $("#resultado").append(tabela);
});


$("#btn-deletar").click(function () {

    var nome = $("#nome").val();
    var senha = $("#senha").val();

    if (nome == "" || senha == "") {

        alert("Campo de nome ou senha vazio.");

        return;
    }

    var deletado = deletarUsuario(nome, senha);

    if (deletado) {

        alert("Usuário deletado com sucesso.");
    } else {

        alert("Usuário " + nome + " não encontrado.");
    }

    $("#nome").val("");
    $("#nivel").val("");
    $("#regiao").val("");
    $("#personagem").val("");
    $("#senha").val("");
    $("#resultado").empty();
});


$("#btn-buscar").click(function () {

    var nome = $("#nome").val();

    if (nome == "") {

        alert("Por favor, digite o nome do usuário que deseja buscar.");

        return;
    }

    var usuario = buscarUsuario(nome);

    if (usuario != null) {

        $("#nivel").val(usuario.nivel);
        $("#regiao").val(usuario.regiao);
        $("#personagem").val(usuario.personagem);

        alert("Usuário " + nome + " encontrado.");
    } else {

        alert("Usuário não encontrado.");
    }

    $("#resultado").empty();
});

function alterarUsuario(nome, novoUsuario, senha) {

    var dados = localStorage.getItem("dados");

    if (dados == null) {

        return false;
    } else {

        dados = JSON.parse(dados);

        for (var i = 0; i < dados.length; i++) {

            var usuario = dados[i];

            if (usuario.nome == nome) {
                if (usuario.senha == senha) {

                    dados[i] = novoUsuario;

                    var json = JSON.stringify(dados);

                    localStorage.setItem("dados", json);

                    return true;
                } else {
                    alert("Digite a senha correta para efetuar a alteração.")
                }
            }
        }

        return false;
    }
}


$("#btn-alterar").click(function () {

    var nome = $("#nome").val();
    var nivel = $("#nivel").val();
    var regiao = $("#regiao").val();
    var personagem = $("#personagem").val();
    var senha = $("#senha").val();


    if (nome == "" || nivel == "" || regiao == "" || personagem == "" || senha == "") {

        alert("Por favor, preencha todos os campos.");

        return;
    }


    var novoUsuario = {
        nome: nome,
        nivel: nivel,
        regiao: regiao,
        personagem: personagem,
        senha: senha
    };


    var alterado = alterarUsuario(nome, novoUsuario, senha);


    if (alterado) {

        alert("Usuario " + nome + " alterado com sucesso.");
    } else {

        alert("Usuário não encontrado.");
    }

    $("#nome").val("");
    $("#nivel").val("");
    $("#regiao").val("");
    $("#personagem").val("");
    $("#senha").val("");
    $("#resultado").empty();
});