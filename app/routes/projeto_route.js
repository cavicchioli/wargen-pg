'use strict';

module.exports = function(server) {

	//ROTAS DA API DE PROJETOS

	var projeto = server.app.controllers.projeto_controller

	server.post('/projeto/criar', projeto.insereProjeto);

};