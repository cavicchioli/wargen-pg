'use strict';

var pg = require("pg");

var config = require("../../config/index.js");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

/**
 * Cria um token do usuário que é passado, afim de usar na sessão e validação do usuário (middleware)
 */
function criaToken(id, nome, email, tipo) {

	var token = jwt.sign({
		_id: id,
		nome: nome,
		email: email,
		tipo: tipo
	}, config.secretKey, {
		expiresIn: 86400
	});
	return token;
};



exports.insere = function(req, callback) {

	console.log("NOVO USÁRIO:: Nome:" + req.body.nome + " Email:" + req.body.email + " Conf. Email:" + req.body.email_conf + " Senha:" + req.body.senha + " Conf. Senha:" + req.body.senha_conf);

	pg.connect(config.connectionString, function(err, client, done) {
		if (err) {

			var ret = {
				sucess: false,
				msg: err
			};

			callback(ret);

		} else {

			bcrypt.hash(req.body.senha, null, null, function(err, hash) {

				if (err) {

					var ret = {
						sucess: false,
						msg: err
					};

					callback(ret);
				}

				client.query("select sp_wargen_cadastra_usuario($1,$2,$3,$4,$5) as msg", [req.body.nome, req.body.email, req.body.email_conf, hash, hash],

					function(err, result) {

						done();

						if (err) {
							console.log(err);

							var ret = {
								sucess: false,
								msg: err
							};

							callback(ret);

						} else {
							if (result.rows[0]["msg"] == "OK") {

								var ret = {
									sucess: true,
									msg: 'OK'
								};
								callback(ret);

							} else {
								var ret = {
									sucess: false,
									msg: result.rows[0]["msg"]
								};
								callback(ret);
							}
						}

						client.end();

					});
			});
		}

	});
};

exports.validaUsuario = function(req, callback) {

	console.log("LOGIN USÁRIO: Email:" + req.body.email + "Senha:" + req.body.senha);

	pg.connect(config.connectionString, function(err, client, done) {

		if (err) {
			console.log(err);

			var ret = {
				sucess: false,
				msg: err,
				token: null
			};

			callback(ret);

		} else {

			client.query("select usu_cod, usu_nome, usu_email, usu_senha as hash, usu_tipo from usuarios where usu_dtcanc is null and usu_email = $1", [req.body.email],

				function(err, result) {

					done();

					if (err) {
						console.log(err);

						var ret = {
							sucess: false,
							msg: err,
							token: null
						};

						callback(ret);

					} else {

						if (result.rowCount > 0) {
							bcrypt.compare(req.body.senha, result.rows[0]["hash"], function(err, res) {

								if (res) {
									var ret = {
										sucess: true,
										msg: 'OK',
										token: criaToken(result.rows[0]["usu_cod"], result.rows[0]["usu_nome"], result.rows[0]["usu_email"], result.rows[0]["usu_tipo"])
									};
								} else {
									var ret = {
										sucess: false,
										msg: 'Email / Senha inválido.',
										token: null
									};
								}

								callback(ret);
							});



						} else {

							var ret = {
								sucess: false,
								msg: 'Email / Senha inválido.',
								token: null
							};

							callback(ret);
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