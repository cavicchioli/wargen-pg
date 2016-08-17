'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new schema({
  nome: String,
  email: {
    type: String,
    require: true,
    index: {
      unique: true
    }
  },
  senha: {
    type: String,
    require: true,
    select: false
  },
  dtreg: {
    type: Date,
    default: Date.now(),
    require: true
  },
  dtcanc: Date,
  tipo: {
    type: String,
    require: true
  }

});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('senha')) return next();

  bcrypt.hash(user.senha, null, null, function(err, hash) {
    if (err) return next(err);

    console.log('hash: ' + hash);

    user.senha = hash;
    next();
  });
});

userSchema.methods.comparaSenha = function(senha) {
  var user = this;

  return bcrypt.compareSync(senha, user.senha);
};



userSchema.methods.comparaSenha2 = function(senha, callback) {
  bcrypt.compare(senha, this.senha, callback)
};



module.exports = mongoose.model('User', userSchema);