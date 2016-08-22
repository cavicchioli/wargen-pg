'use strict';

module.exports = function(server) {

	server.get('/login', function(req, res) {  
		res.render('pages/home/login',{titulo:'Login'})});

	server.get('/cadastrar', function(req, res) {  
		res.render('pages/home/signup',{titulo: 'Cadastrar'})});

	server.get('/home',function(req,res) {
		res.render('pages/home/home',{titulo:'Home'})});


	server.get('/cubo',function(req,res) {
		res.render('pages/wargen/cubo',{titulo:'Cubo'})});


	server.get('/teste',function(req,res) {
		res.render('pages/home/teste')});


var db = [];

var Expense = function(name, time){
  this.desc = name;
  this.time = time;
}

//initialize db with some expenses
db.push(new Expense('phone call', 0.2));
db.push(new Expense('writing', 0.6));
db.push(new Expense('reading', 0.9));


	server.get("/api/expenses/", function(req, res){
		res.json(200, db);
	});

	server.post("/api/expenses/", function(req, res){
		console.log('req', req.body);
		db.push(new Expense(req.body.desc, req.body.time));
		res.json(200, db[db.length-1]);
		res.end();

	});

};