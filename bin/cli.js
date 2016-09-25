#!/usr/bin/env node

var fs = require('fs-extra')
var program = require('commander')
var inquirer = require('inquirer')
var prompt = inquirer.createPromptModule()
var path = require('path')
var childProcess = require('child_process')
var exec = childProcess.exec
var spawn = childProcess.spawn
var fork = childProcess.fork
var sampleDir = __dirname + '/../sample'
var argv = require('minimist')(process.argv.slice(2))
var wd = process.cwd()
var destDir = path.normalize(wd + '/' + argv._[1])

var parsePackageFile = function (moduleDir) {
	var packageFile = moduleDir + '/package.json'
	try {
		if (fs.existsSync(packageFile)) {
			return JSON.parse(fs.readFileSync(packageFile, {encoding: 'utf8'}))
		}
	} catch (e) {}

	return {}
}

var usage = function() {
	console.log('')
	console.log('  Usage:\n')
	console.log('  $ vue-cluster --help')
	console.log('  $ vue-cluster -h')
	console.log('  $ vue-cluster --version')
	console.log('  $ vue-cluster -v')
	console.log('  $ vue-cluster create <name>')
	console.log('')
}

var error = function(msg) {
	return console.warn(msg)
}

var success = function(msg) {
	return console.log(msg)
}

var setupMessage = function() {
	console.log('Creating app structure...')
}

var promptConfirm = function (message, callback) {
	prompt([
		{
			type: 'confirm',
			message: message,
			name: 'result'
		}
	]).then((answers) => {
		callback(answers.result)
	}).catch((err) => {
		return error(err.message)
		process.exit()
	})
}

var copyDirRecursive = function (src, dest) {
	try {
		fs.copySync(src, dest)
		return true
	} catch (e) {
		console.log('Failed to create application. Please check permissions on that folder.')
		process.exit(1)
	}
	return false
}

var rmdirRecursive = function (dirname) {
	try {
		fs.removeSync(dirname)
		return true
	} catch (e) {
		console.log('Failed to remove directory before installing. Please verify..')
		process.exit(1)
	}
	return false
}

var packageJson = parsePackageFile(__dirname + '/../')

program
	.version(packageJson.version)
	.command('create [name]','Install a VueCluster starting application')

program.on('--help',usage)

var createFail = function () {
	error("Failed to create VueCluster starting app.")
	process.exit()
}

var createSuccess = function () {
  console.log('Installing app dependencies using npm. This could take a while...')

  var npmCommand = (process.platform === "win32" ? "npm.cmd" : "npm")
  var options = {
    cwd: destDir,
    maxBuffer: Infinity
  }

  var npmProcess = spawn(npmCommand, ['install'], options)

  npmProcess.stdout.on('data', function (data) {
    process.stdout.write(data);
  })

  npmProcess.stderr.on('data', function (data) {
    process.stderr.write(data)
  })

  npmProcess.on('close', function (code) {
    if (code) {
      return error('Failed to install npm dependencies. Exited with code ' + code + '.')
    } else {
      success("VueCluster '" + destDir + "' was setup successfully.")
    }
    process.exit(code)
  })

  npmProcess.stdin.end()
}

program.on('create',function() {
	var name = process.argv.length && process.argv[3] ? process.argv[3] : null
	if (!name) {
		usage()
		return error('A name is required to create a starting application')
	}

	console.log('Attempting to create',name,'at',destDir)
	if (fs.existsSync(destDir)) {
		var message = 'There is already a directory at ' + destDir + '. Do you want to overwrite it?'
		promptConfirm(message,function(res) {
			if (!res) {
				console.log('Application not built. Thanks for using the app!')
				process.exit(1)
			}

		})
	} else {
		setupMessage()
		if (copyDirRecursive(sampleDir, destDir)) {
			createSuccess()
		} else {
			createFail()
		}
	}
})

program.parse(process.argv)