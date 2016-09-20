'use strict';

var db = require("../models/projeto_model.js");

var config = require("../../config/index.js");

exports.insereProjeto = function(req, res) {
    if (req.body.nome == null || req.body.nome == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo NOME.'
        });
    } else if (req.body.desc == null || req.body.desc == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo DESCRIÇÃO.'
        });
    } else if (req.body.tipo == null || req.body.tipo == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher a VISIBILIDADE do projeto.'
        });

    } else {
        db.insereProjeto(req,function(result) {

            res.send(result);
            console.log(result);
        });
    }
};