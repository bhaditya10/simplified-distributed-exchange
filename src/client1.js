'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const  order = require("./distributedExchange");
const orderModule = require('./client2orderBook.js');


const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(function () {
  link.announce('rpc_test', service.port, {})
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  const result = orderModule.orderModule.addClient2Order(payload)
  console.log(payload)
  handler.reply(null, result)
})

  