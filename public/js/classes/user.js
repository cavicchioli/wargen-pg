$(function(){

    var Usuario = function(data){
        this.nome = ko.observable(data.nome);
        this.email = ko.observable(data.email);
        this.email_conf = ko.observable(data.email_conf);
        this.senha = ko.observable(data.senha);
        this.senha_conf = ko.observable(data.senha_conf);
    };

    Usuario.prototype.criaUsuario = function(){
        var request = $.ajax({
            type: "POST",
            url: "/usuario/criar",
            dataType: "json", 
            data: {
                nome : this.nome(),
                email : this.email(),
                email_conf : this.email_conf(),
                senha : this.senha(),
                senha_conf : this.senha_conf()

            }
        });

        request.done(function(response){
            console.log(response);
            viewModel.expenses.push(new Expense({
                desc: response.desc,
                time: response.time
            }));
        });
    }

    var UsuariosViewModel = function() {
        var self = this;
        self.expenses = ko.observableArray();

        self.total = ko.computed(function(){
            var total = 0;
            var hourly_rate = 100;
            for(var p=0; p < self.expenses().length; p++){
                total += parseFloat(self.expenses()[p].time());
            }
            return (total*hourly_rate).toFixed(2);
        })

        self.addExpense = function(){
            var expense = new Expense({
                desc: $('#desc').val(),
                time: $('#time').val()
            });

            expense.addToDB();
        }
        
        var refresh = function() {
           var request = $.ajax({
                url: "/api/expenses/",
                type: "GET",
                dataType: "json"
            });

           request.done(function(response){
            for (var i=0; i < response.length; i++ ){
                self.expenses.push(new Expense(response[i]));
            }
           });

           request.fail(function( jqXHR, textStatus ) {
              console.log( "Request failed: " + textStatus );
            });

       }
        //refresh immediately to load initial data
        refresh();

    };


	var viewModel = new UsuariosViewModel();

	//insert some fake users for now
	viewModel.expenses.push(new Expense({
		desc: "phone call",
        time: "0.5",
	}));

	ko.applyBindings(viewModel);
});