'use strict';

var pg = require("pg");

var config = require("../../config/index.js");
//var bcrypt = require('bcrypt-nodejs');
//
exports.insere = function(req, res) {

	console.log("NOVO USÁRIO:: Nome:" + req.body.nome + " Email:" + req.body.email + " Conf. Email:" + req.body.email_conf + " Senha:" + req.body.senha + " Conf. Senha:" + req.body.senha_conf);

	pg.connect(config.connectionString, function(err, client, done) {
		if (err) {

			res.json({
				sucess: false,
				msg: err
			});
		} else {

			client.query("select sp_wargen_cadastra_usuario($1,$2,$3,$4,$5) as msg", [req.body.nome, req.body.email, req.body.email_conf, req.body.senha, req.body.senha_conf],

				function(err, result) {

					done();

					if (err) {
						console.log(err);
						res.json({
							sucess: false,
							msg: err
						});

					} else {
						if (result.rows[0]["msg"] == "OK") {
							res.json({
								sucess: true,
								msg: result.rows[0]["msg"]
							});
						} else {
							res.json({
								sucess: false,
								msg: result.rows[0]["msg"]
							});
						}
					}

					client.end();

				});
		}
	});

	/* FUNÇÃO PARA FAZER O HASH DA SENHA DO USUARIO

bcrypt.hash(req.senha, null, null, function(err, hash) {
    if (err) return next(err);

    console.log('hash: ' + hash);

    user.senha = hash;
    next();
  });
  */

};

exports.validaUsuario = function(req, callback) {

	//console.log("senha: " + req.body.senha + " email: " + req.body.email);

	pg.connect(config.connectionString, function(err, client, done) {
		if (err) {
			console.log(err);

			var result = {
				sucess: false,
				msg: err
			};

			callback(result);

		} else {

			client.query("select sp_wargen_valida_usuario($1,$2) as msg", [req.body.email, req.body.senha],

				function(err, result) {

					done();

					if (err) {
						console.log(err);

						var result = {
							sucess: false,
							msg: err
						};

						callback(result);

					} else {
						console.log("passou");

						if (result.rows[0]["msg"] == "OK") {

							console.log(result.rows[0]["msg"]);

							var result = {
								sucess: true,
								msg: result.rows[0]["msg"]
							};

							callback(result);
						} else {
							console.log(result.rows[0]["msg"]);

							var result = {
								sucess: false,
								msg: result.rows[0]["msg"]
							};

							callback(result);
						}
					}

					client.end();

				});
		}
	});
};

exports.todosUsuarios = function(req, res) {

	sql = "select * from usuarios";

	pg.connect(config.connectionString, function(err, client, done) {
		if (err) {

			res.send({
				erro: err
			});
		} else {


			client.query(sql, function(err, result) {

				done();

				if (err) {
					console.log(err);
					res.send({
						erro: err
					});
				} else {

					res.send(result.rows);
				}

				client.end();

			});
		}
	});

};