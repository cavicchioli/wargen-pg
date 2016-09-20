'use strict';

var pg = require("pg");

var config = require("../../config/index.js");

 exports.insereProjeto = function(req, callback) {

 	console.log("NOVO PROJETO: Nome:" + req.body.nome + " Descrição:" + req.body.desc + " Tipo:" + req.body.tipo);

 	pg.connect(config.connectionString, function(err, client, done) {
 		if (err) {

 			var ret = {
 				sucess: false,
 				msg: err
 			};

 			callback(ret);

 		} else {
			//usu_cod = 5 - Victor
			client.query("select sp_wargen_cadastra_projeto($1,$2,$3,$4) as msg", [req.body.nome, req.body.desc, req.body.tipo, 5],

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
		}

	});
 };

 exports.retornaProjetoPorCodigo = function(req, res) {

 	pg.connect(config.connectionString, function(err, client, done) {
 		if (err) {

 			res.send({
 				erro: err
 			});
 		} else {

 			client.query("select * from projetos where pro_cod = $1", [req.body.projeto], function(err, result) {

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

 exports.retornaProjetoPorUsuario = function(req, res) {

 	pg.connect(config.connectionString, function(err, client, done) {
 		if (err) {

 			res.send({
 				erro: err
 			});
 		} else {

 			client.query("select * from projetos where usu_cod = $1", [req.body.usuario], function(err, result) {

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