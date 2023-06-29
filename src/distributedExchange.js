const { promisify } = require('util');

// Define an object to represent the order book
const orderBook = {
  orders: [],
  isUpdating: false,
  lock: promisify(setImmediate),

  // Method to add an order to the order book
  addOrder: async function (order) {
    while (this.isUpdating) {
      await this.lock();
    }

    try {
      this.isUpdating = true;
      this.orders.push(order);
      await this.matchOrders(order);
      console.log(`Order added: ${order.type} ${order.quantity} shares at $${order.price}`);
      console.log('Order book:', this.orders);
    } finally {
      this.isUpdating = false;
    }
  },

  // Method to match orders and add any remainder to the order book
  matchOrders: async function (newOrder) {
    for (let i = 0; i < this.orders.length; i++) {
      const existingOrder = this.orders[i];

      // Check if the new order matches the existing order
      if (newOrder.type !== existingOrder.type && newOrder.price === existingOrder.price) {
        if (newOrder.quantity > existingOrder.quantity) {
          // New order partially matches the existing order
          const remainder = newOrder.quantity - existingOrder.quantity;
          console.log(`Match found: ${existingOrder.quantity} shares sold at $${existingOrder.price}`);
          console.log(`Remaining ${remainder} shares added to the order book.`);
          newOrder.quantity = remainder; // Update the new order quantity
          this.orders.splice(i, 1); // Remove the existing order
          i--; // Decrement the index as we removed an order from the array
        } else if (newOrder.quantity < existingOrder.quantity) {
          // New order fully matches the existing order
          const remainder = existingOrder.quantity - newOrder.quantity;
          console.log(`Match found: ${newOrder.quantity} shares sold at $${existingOrder.price}`);
          console.log(`Remaining ${remainder} shares added to the order book.`);
          existingOrder.quantity = remainder; // Update the existing order quantity
          return; // Exit the loop as the new order is fully matched
        } else {
          // New order completely matches the existing order
          console.log(`Match found: ${newOrder.quantity} shares sold at $${existingOrder.price}`);
          this.orders.splice(i, 1); // Remove the existing order
          return; // Exit the loop as the new order is fully matched
        }
      }
    }
  },
};

module.exports.orderBook = { orderBook };

// Example usage
  const client1Order = {
    type: 'buy',
    price: 10,
    quantity: 5,
  };
  orderBook.addOrder(client1Order);

  // const client2Order = {
  //   type: 'sell',
  //   price: 10,
  //   quantity: 3,
  // };
  // orderBook.addOrder(client2Order);

  // const client3Order = {
  //   type: 'buy',
  //   price: 10,
  //   quantity: 7,
  // };
  // orderBook.addOrder(client3Order);
