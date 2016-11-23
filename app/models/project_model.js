/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-11-19
 */
/*
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
*/

/**
 * @method POST
 * @description Insert new app project in the database.
 *              Insere um novo projeto de app no banco de dados.
 */
/*
exports.newProject = function(req, callback) {

    console.log("NEW PROJECT:: User:"+ req.params.user +" Name:" + req.body.name + " Description:" + req.body.description + " Private project?:" + req.body.private + " Knowledge group:" + req.body.group + "Especification area:" + req.body.area + "Subject:" + req.body.subject);

     pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {
            //usu_cod = 5 - Victor
            client.query("select sp_wargen_cadastra_projeto($1,$2,$3,$4) as msg", [req.body.name, req.body.description, req.body.private, req.params.user],

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

exports.retornaProjetoPorUsuario = function(req, callback) {

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);
        } else {

            //5 - victor passar o usuário que vem do token
            client.query("select * from projetos where usu_cod = $1 and pro_dtcanc is null", [5], function(err, result) {

                done();

                if (err) {
                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);
                } else {

                    callback(result.rows);
                }

                client.end();

            });
        }*/
    });
};
