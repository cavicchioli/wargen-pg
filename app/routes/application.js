'use strict';

module.exports = function(server) {

   var user = server.app.controllers.users;
   var app = server.app.controllers.application;
   
	//Middleware to check if the user have a token, and if this is valid.
	//server.use();

	// Creating a new user
	server.post('/application', user.checkLogin, app.create);

	//List All Apps from the logged user
	server.get('/application', user.checkLogin, app.list);
};