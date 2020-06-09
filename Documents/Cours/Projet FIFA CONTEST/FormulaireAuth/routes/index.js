const express = require('express');
const router = express.Router();
//...
const { check, validationResult, matchedData } = require('express-validator');
//....
const mongoose = require('mongoose');
const Firstdb = mongoose.model('Joueurs');

//......
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
	res.status(200).render('form', { 
		title: 'FIFA Contest',
		cancre: 'Inscription'
 	});
});

router.post('/', 
	[
	check('nom')
		.isLength({ min: 1 })
		.withMessage('Svp entrez votre nom')
		.trim(),
	check('prenom')
		.isLength({ min: 1 })
		.withMessage('Svp entrez votre prénom')
		.trim(),
	check('pseudo')
		.isLength({ min: 1 })
		.withMessage('Svp Renseignez votre Pseudo')
    	.trim(),
	check('email')
		.isEmail()
		.withMessage('-Please enter an email-')
	    .bail()
	    .trim()
	    .normalizeEmail()
	],
	(req, res) => {
		const errors = validationResult(req);
		
		if (errors.isEmpty()) {
			const firstdb = new Firstdb(req.body);
  			firstdb.save()
			.then(() => { res.send('.:Thank you (￣▽￣)ノ to persist U data :.'); })
			.catch((err) => {
					console.log(err);
  					res.send('.: Sorry! Something went wrong :.');
				}
			);
		} else {
			res.render('form', {
				title: '-:POST:-', 
				errors: errors.array(),
				data: req.body,
			});
		}
});

router.get('/list', basic.check((req, res) => {
  Firstdb.find()
    .then((menu) => {
      res.render('index', { title: '-:List of records:-', menu });
    })
    .catch(() => { res.send('-:Sorry! Something went wrong ( ͡ ͜ʖ ͡ ) :-'); });
}));

module.exports = router;
