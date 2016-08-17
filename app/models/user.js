'use strict';

var pg = require("pg");
var config = require("../../config/index.js");
//var bcrypt = require('bcrypt-nodejs');



exports.insere = function(req, res) {


console.log("NOVO USÁRIO:: Nome:"+req.nome+" Email:"+req.email+" Conf. Email:"+req.email_conf+" Senha:"+req.senha+" Conf. Senha:"+req.senha_conf);



sql = "select sp_wargen_cadastra_usuario("+req.nome+","+req.email+","+req.email_conf+","+req.senha+","+req.senha_conf") as msg";

			pg.connect(config.connectionString, function(err, client, done) {
				  if(err) {
				  	
				    res.send({erro : err});
				  }else{

				  
				  	client.query(sql, function(err, result) {
					    
					    done();

					    if (err){ console.log(err); res.send({erro : err}); 
					    }else{
					    	
			      			res.send(result.rows);
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

