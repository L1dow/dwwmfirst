const mongoose = require('mongoose');
const firstdbSchema = new mongoose.Schema({
	nom: {
    	type: String,
    	trim: true,
	},
	prenom: {
    	type: String,
    	trim: true,
	},
	pseudo: {
    	type: String,
    	trim: true,
	},
	email: {
    	type: String,
    	trim: true,
	},
});

module.exports = mongoose.model('Joueurs', firstdbSchema);
