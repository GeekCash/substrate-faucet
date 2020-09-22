const Faucet = require('./src/server/faucet'),
    config = require("./src/server/config/env/development");


const faucet = new Faucet(config);

setTimeout(function(){

    faucet.send("5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y");

}, 5000);