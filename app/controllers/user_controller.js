'use strict';

var db = require("../models/user_model.js");

var config = require("../../config/index.js");

/**
 * Cria um token do usuário que é passado, afim de usar na sessão e validação do usuário (middleware)
 
function createToken(user) {

    var token = jsonwebtoken.sign({
        _id: user._id,
        nome: user.nome,
        email: user.email
    }, config.secretKey, {
        expiresIn: 86400
    });
    return token;
};
*/

exports.criaUsuario = function(req, res) {

    db.insere(req.body, res);


console.log(res.body);

	/*db.insere(req, res,
        function(err) {
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            sucess:true,
            msg: 'Usuário criado com sucesso!'
            //,token: token
        });
    });*/

  
};


exports.RetornaUsuarios = function(req, res) {

    //var token = createToken(req);

    db.todosUsuarios(function(err) {
        if (err) {
            res.send(err);
            return;
        }

/*
        res.json({
            sucess:true,
            msg: 'Usuário criado com sucesso!'
            //,token: token
        });
        */
    });

  
};

