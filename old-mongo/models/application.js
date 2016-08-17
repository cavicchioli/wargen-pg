'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var appSchema = new schema({
  nome: {type: String, require:true},
  descricao:{type:String, require: true},
  id_grande_area:{type: schema.Types.ObjectId, ref:'Areas_Conhecimento_Cnpq',require:true},
  id_area:{type: schema.Types.ObjectId, ref:'Areas_Conhecimento_Cnpq',require:true},
  id_sub_area:{type: schema.Types.ObjectId, ref:'Areas_Conhecimento_Cnpq',require:true},
  privado:{type:Boolean,default: false, require:true},
  autor: {type: schema.Types.ObjectId, ref:'User', require: true},
  dtreg: {type: Date, default: Date.now(), require: true},
  dtcanc: Date

});

module.exports = mongoose.model('App', appSchema);