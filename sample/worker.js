var fs = require('fs')
var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
var scCrudMysql = require('sc-crud-mysql')
var Password = require('./models/Password.js')

module.exports.run = function (worker) {
    console.log('   >> Worker PID:', process.pid)

    var app = require('express')()
    var config = require('./config.json')

    var httpServer = worker.httpServer
    var scServer = worker.scServer

    var sc_crud_mysql = scCrudMysql.attach(worker,{ db:config.db })

    app.set('views', __dirname+'/views')
    app.set('view engine', 'pug')
    app.use(serveStatic(path.resolve(__dirname, 'public')))

    httpServer.on('request', app)

    app.get('*',function(req,res) {
        res.render('home/index.pug',{
            address:config.address || 'localhost',
            port:config.port || 3000
        })
    })

    scServer.on('connection', function (socket) {
        console.log('Client',socket.id,'connected at',new Date())

        socket.on('login',function(data,respond) {
            if (!data.email) { return respond('An email is required to login') }
            if (!data.password) { return respond('An password is required to login') }
            sc_crud_mysql.query('SELECT * FROM users WHERE email = ?',[
                data.email
            ],function(err,rows) {
                if (err) { return respond(err) }
                var user = rows[0]
                if (Password.verify(data.password,user.password)) {
                    delete user.password
                    socket.setAuthToken(user)
                    return respond(null,user)
                }
                return respond('Invalid password')
            })
        })

        socket.on('logout',function(data,respond) {
            socket.deauthenticate()
            return respond(null)
        })
    })
}