'use strict';

module.exports = function(server) {


	
	var cnpq = server.app.controllers.cnpq_controllers;

	//Create a new user.
	server.post('/cnpq', cnpq.insertAll);
};