'use strict';

module.exports = function(server) {

	//forma antiga de fazer o require
	//var user = require("../../app/controllers/users.js");

	//fazendo a chamada para poder todas as funções do controller user
	//server/app/controllers/users.js (que foi carregado via consign)
	var user = server.app.controllers.user_controller

	//server.get('/login', user.viewLogin);

	// Creating a new user
	server.post('/usuario/criar', user.criaUsuario);

	server.get('/usuario/todos', user.RetornaUsuarios)

	server.post('/usuario/logar', user.validaLogin);

	server.get('/usuario/teste', function(req, res) {

		res.json(200, [{
			name: "Item 1 from server",
			complete: false
		}, {
			name: "Item 2 from server",
			complete: false
		}, {
			name: "Completed Item from server",
			complete: true
		}]);
		res.end();
	});


	//rote to login a user and create a token
	//server.post('/login', user.login);


	//Middleware to check if the user have a token, and if this is valid.
	//server.use(user.checkLogin);

	//If login it's ok, the app send you to main/home page
	//server.get('/app', user.checkLogin, user.home);

	//Get all users from DB
	//server.get('/users', user.checkLogin, user.list);

	//Get logged user informations (decoded)
	//server.get('/me', user.checkLogin, user.getUserInformation);
};