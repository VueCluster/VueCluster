var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var async = require('async')
exports.up = function(db, callback) {
	async.series([
		db.createTable.bind(db,'users', {
			id: { type: "int", primaryKey:true, autoIncrement: true, notNull: true },
			first: { type: "string", length:100 },
			last: { type: "string", length:100 },
			email: { type: "string", length:100 },
			password: { type: "string", length:100 },
			type_id: { type: "int", length:11, defaultValue:1 },
			reset_pass: { type: "string", length:100 },
			visible: { type: "smallint", length:1, defaultValue:1 }
		},function (err) {
			if (err) { callback(err);return }
			db.connection.query([
				'ALTER TABLE users',
				'ADD updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP',
				'ON UPDATE CURRENT_TIMESTAMP,',
				'ADD created_at timestamp NOT NULL'
			].join(' '),function (err) {
				if (err) { callback(err);return }
				db.connection.query([
					'CREATE TRIGGER users_insert',
					'BEFORE INSERT ON users FOR EACH ROW SET NEW.created_at = CURRENT_TIMESTAMP'
				].join(' '),callback)
			})
		})
	], callback)
}

exports.down = function(db, callback) {
	async.series([
		db.dropTable.bind(db,'users')
	], callback)
}