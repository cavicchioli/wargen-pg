'use strict';

var db = require("../models/application.js");

/**
 * Create application
 */
exports.create = function(req, res) {

    var application = new db({
        nome: req.body.nome,
        descricao: req.body.descricao,
        id_grande_area: req.body.grande_area,
        id_area: req.body.area,
        id_sub_area: req.body.sub_area,
        privado: req.body.privado,
        autor: req.decoded._id
        
    });

    console.log('New Application : { id: ' + application._id + ' nome: ' + application.nome + ' descricao: ' + application.descricao + ' grande_area: ' + application.id_grande_area + ' area: ' + application.id_area +  ' sub_area: ' + application.id_sub_area +' privado: ' + application.privado +' autor: ' + application.autor +' }');

    application.save(function(err) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            msg: 'Aplicação criado com sucesso!'
        });
    });
};

/**
 * List all applications
 */
exports.list = function (req, res) {

     db.find({autor:req.decoded._id}, function(err, apps) {
        if (err) {
            res.send(err);
            return;
        }

        res.json(apps);
    });
}