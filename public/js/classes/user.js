$(function () {


    //MODEL
    var Usuario = function (data) {
        this.nome = ko.observable(data.nome);
        this.email = ko.observable(data.email);
        this.email_conf = ko.observable(data.email_conf);
        this.senha = ko.observable(data.senha);
        this.senha_conf = ko.observable(data.senha_conf);
    };

    Usuario.prototype.criaUsuario = function () {
        var request = $.ajax({
            type: "POST",
            url: "/usuario/criar",
            dataType: "json",
            data: {
                nome: this.nome(),
                email: this.email(),
                email_conf: this.email_conf(),
                senha: this.senha(),
                senha_conf: this.senha_conf()

            }
        });

        request.done(function (response) {
            console.log(response);
            viewModel.usuarios.push(new Usuario({
                nome: response.nome,
                email: response.email,
                email_conf: response.email_conf,
                senha: response.senha,
                senha_conf: response.senha_conf
            }));
        });
    }

    var UsuariosViewModel = function () {
        var self = this;
        self.usuarios = ko.observableArray();

        self.addUsuario = function () {
            var usuario = new Usuario({
                nome: $('#nome').val(),
                email: $('#email').val(),
                email_conf: $('#email_conf').val(),
                senha: $('#senha').val(),
                senha_conf: $('#senha_conf').val()
            });

            usuario.criaUsuario();
        }

        //var refresh = function () {
        //    var request = $.ajax({
        //        url: "/usuario/refresh/",
        //        type: "GET",
        //        dataType: "json"
        //    });

        //    request.done(function (response) {
        //        for (var i = 0; i < response.length; i++) {
        //            self.expenses.push(new Expense(response[i]));
        //        }
        //    });

        //    request.fail(function (jqXHR, textStatus) {
        //        console.log("Request failed: " + textStatus);
        //    });

        //}
        ////refresh immediately to load initial data
        //refresh();

    };


    var viewModel = new UsuariosViewModel();

    ////insert some fake users for now
    //viewModel.expenses.push(new Expense({
    //	desc: "phone call",
    //    time: "0.5",
    //}));

    //ko.applyBindings(viewModel);
});