var bcrypt = require('bcrypt')
var Password = function() {
	var self = this
}

Password.prototype.hash = function(pwd,respond) {
	if (!pwd || typeof pwd != 'string') { return respond('Password must be a valid string.') }
	var hash = bcrypt.hashSync(pwd,bcrypt.genSaltSync(10))
	if (respond && typeof respond == 'function') { return respond(null,hash) }
	return hash
}

Password.prototype.verify = function(pwd,hash) {
	return bcrypt.compareSync(pwd,hash)
}

module.exports = new Password()