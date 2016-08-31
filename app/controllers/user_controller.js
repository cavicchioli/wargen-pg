//'use strict';

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

    db.insere(req, res);
    console.log(res.body);
};

exports.validaLogin = function(req, res, next) {

    db.validaUsuario(req, function(result) {

        res.send(result);
        console.log('Chegou a retornar da execução da função no model, que valida o user');
       
        //if (!result.sucess) {
        //console.log(result.err);
        //res.send(result);
        //    return result;
        // } else {
        //console.log(result.sucess);
        //res.status(200).json(result);

        //console.log(res);


        //    return result;
        //}
    });


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