# simplified-distributed-exchange

### Setting up the DHT

```
npm i -g grenache-grape
```

## boot two grape servers

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

### Setting up Grenache in your project

```
npm install --save grenache-nodejs-http
npm install --save grenache-nodejs-link
```

### To check thee order matching engine:

```
node distributedExchange.js
```

### To check with the two clients:
```
node client1.js
node client2.js
```

### Output will show the updated remainder orders / shares with the orderbook.