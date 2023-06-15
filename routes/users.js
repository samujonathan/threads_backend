var express = require('express');
const bcrypt = require('bcrypt');
const rounds = 10;
var router = express.Router();

var pool = require('./pool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res) {
		const data = req.body;
		const saltRounds = 10;
		const yourPassword = data.password;
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(yourPassword, salt, (err, hash) => {
				pool.query(`INSERT INTO users (user_name, password) VALUES
					('${data.userName}', '${hash}')`, (error, result) => {

						if(error){
							res.status(404).send(error.message);
						}else{
							res.status(200).send('successful');
						}
						
					})
			});
		});
})

router.get('/login', function(req, res) {
		const data = req.body;
		const yourPassword = data.password;	
		pool.query(`SELECT (password) FROM users WHERE user_name='${data.userName}'`, (error, result) => {
			if(error){
				res.status(404).send(error.message)
			}else{
				bcrypt.compare(yourPassword, result.rows[0].password, (err, pass) => {
					if(err) res.status(404).send(err.message);
					if(!pass) res.status(401).send("Incorrect password");
					let cookie_val = {
						reg_no:data.userName
					}
					res.cookie('userCookie', cookie_val)
					res.send("Correct");
				})
			}
		})
})


module.exports = router;
