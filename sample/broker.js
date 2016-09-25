var scRedis = require('sc-redis')

module.exports.run = function (broker) {
    console.log('   >> Broker PID:', process.pid)
    scRedis.attach(broker)
}
