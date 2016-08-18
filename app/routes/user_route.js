'use strict';

module.exports = function(server) {

	//forma antiga de fazer o require
	//var user = require("../../app/controllers/users.js");

	//fazendo a chamada para poder todas as funções do controller user
	//server/app/controllers/users.js (que foi carregado via consign)
	var user = server.app.controllers.user_controller

	//server.get('/login', user.viewLogin);

	// Creating a new user
	server.post('/signup', user.criaUsuario);

	server.get('/todos', user.RetornaUsuarios)

	server.get('/login', function(req, res) {  
  			res.render('login')});

	server.get('/signup', function(req, res) {  
  			res.render('signup')});

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