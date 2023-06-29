
const orderModule = {
    client2Order: {
      type: 'sell',
      price: 10,
      quantity: 3,
    },
    addClient2Order: function (orderBook) {
      orderBook.addOrder(this.client2Order);
    },
  };
  
module.exports = {orderModule};
  