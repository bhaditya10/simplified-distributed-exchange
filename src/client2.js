'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const order = require("./distributedExchange").orderBook;
const orderModule = require('./client2orderBook.js').orderModule;

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

const payload = orderModule.addClient2Order(order.orderBook);
peer.request('rpc_test', {  }, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log(data)
})

