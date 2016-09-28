'use strict';

var db = require("../models/user_model.js");

var config = require("../../config/index.js");


exports.criaUsuario = function(req, res) {
    if (req.body.nome == null || req.body.nome == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo NOME COMPLETO.'
        });
    } else if (req.body.email == null || req.body.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo E-MAIL.'
        });
    } else if (req.body.email_conf == null || req.body.email_conf == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo CONFIRMAR E-MAIL.'
        });
    } else if (req.body.email != req.body.email_conf) {
        res.send({
            sucess: false,
            msg: 'O campo E-MAIL e CONFIRMAR E-MAIL não conferem.'
        });
    } else if (req.body.senha == null || req.body.senha == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo SENHA.'
        });
    } else if (req.body.senha_conf == null || req.body.senha_conf == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo CONFIRMAR SENHA.'
        });
    } else if (req.body.senha != req.body.senha_conf) {
        res.send({
            sucess: false,
            msg: 'O campo E-MAIL e CONFIRMAR E-MAIL não conferem.'
        });
    } else {
        db.insere(req,function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.validaLogin = function(req, res, next) {
    if (req.body.email == null || req.body.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo E-MAIL.'
        });
    } else if (req.body.senha == null || req.body.senha == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo SENHA.'
        });
    } else {
        db.validaUsuario(req, function(result) {

            res.send(result);
            console.log(result);
            console.log('Chegou a retornar da execução da função no model, que valida o user');
        });
    }
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

exports.verificaToken = function(req, res) {
        db.verificaToken(req,res, function (result) {
            res.send(result);
            console.log(result);
        });
    
};