'use strict';

var db = require("../models/user-mongo.js");

var jsonwebtoken = require('jsonwebtoken');

var config = require("../../config/index.js");

/**
 * Cria um token do usuário que é passado, afim de usar na sessão e validação do usuário (middleware)
 */
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

/**
 * Create user
 */
exports.create = function(req, res) {

    var user = new db({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        dtreg: Date.now(),
        tipo: 'U'
    });

    console.log('New User : { id: ' + user._id + ' nome: ' + user.nome + ' email: ' + user.email + ' data: ' + user.dtreg + ' senha: ' + user.senha + ' }');


    var token = createToken(user);

    user.save(function(err) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            sucess:true,
            msg: 'Usuário criado com sucesso!',
            token: token
        });
    });

    /*
        var message = null;

        var user = db.User.build(req.body);

        user.provider = 'local';
        user.salt = user.makeSalt();
        user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
        console.log('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');
        
        user.save().then(function(){
          req.login(user, function(err){
            if(err) {
                return next(err);
            }
            res.redirect('/');
          });
        }).catch(function(err){
          res.render('users/signup',{
              message: message,
              user: user
          });
        });

        */
};

/**
 * Função para listar todos os usuários que existem no banco (mongoBD)
 */

exports.list = function(req, res) {
    db.find({}, function(err, users) {
        if (err) {
            res.send(err);
            return;
        }

        res.json(users);
    });
};

/**
 * Função para validar o login, e retornar o token com as informaçãos do usuário
 */
exports.login = function(req, res) {
    db.findOne({
        email: req.body.email
    }).select('nome email senha').exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({
                msg: 'Usuário não encontrado'
            })
        } else if (user)

            var senhaValida = user.comparaSenha(req.body.senha);

        if (!senhaValida) {
            res.send({
                msg: 'Senha Inválida'
            });
        } else {
            //token
            var token = createToken(user);
            res.json({
                sucess: true,
                msg: 'Login efetuado com sucesso!',
                token: token
            })
        }
    })
};



exports.home = function(req, res) {
    res.json("Hello Fucking World");
};

exports.getUserInformation = function(req,res) {
    console.log('aqui');
    res.json(req.decoded);
};

//exports.viewLogin = function(req,res) {
//    res.sendFile(path.join(__dirname + '/public/views/users/login.html'));
//    console.log(__dirname + '/public/views/users/login.html');
//};

/**
 * Função que checa se o token que foi criado é válido, ela é utilizada como uma middleware
 */
exports.checkLogin = function(req, res, next) {

    console.log('Alguém acabou de entrar no aplicativo!');

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

console.log(token);

    if (token) {
        jsonwebtoken.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                res.status(403).send({
                    sucess: false,
                    msg: 'Falha ao autenticar o usuário.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {

        res.status(403).send({
            sucess: false,
            msg: 'Token não encontrado'
        });

    }
};