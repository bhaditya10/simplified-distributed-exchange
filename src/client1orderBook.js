const orderModule = {
    client1Order: {
        type: 'buy',
        price: 10,
        quantity: 5,
    },
    addClient1Order: function (orderBook) {
      orderBook.addOrder(this.client1Order);
    },
  };
  
  module.exports = { orderModule };
  