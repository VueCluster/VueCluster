var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var async = require('async')
var config = require('../config.json') || {}
var Password = require('../models/Password')
exports.up = function(db, callback) {
	async.series([
		db.insert.bind(db,'users', [
			'first',
			'last',
			'email',
			'password',
			'type_id',
			'visible'
		],[
			config.default_user.first || 'nick',
			config.default_user.last || 'kotenberg',
			config.default_user.email || 'nick@mail.com',
			Password.hash(config.default_user.password || 'password'),
			config.default_user.type_id || 1,
			config.default_user.visible || 1
		])
	], callback)
}

exports.down = function(db, callback) {
	return callback()
}