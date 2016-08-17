'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var cnpqSchema = new schema({
	numero_nivel: {type: Int32, require:true},
	codigo_area_conhecimento: {type: Int32, require:true},
	codigo_grande_area: {type: Int32, require:true},
	nome_grande_area: {type: String, require:true},
	codigo_area: {type: Int32, require:true},
	nome_area: {type: String, require:true},
	codigo_sub_area: {type: Int32, require:true},
	nome_sub_area: {type: String, require:true},
	codigo_especialidade: {type: Int32, require:true},
	nome_especialidade: {type: String, require:true}
});

module.exports = mongoose.model('Areas_Conhecimento_Cnpq', cnpqSchema);