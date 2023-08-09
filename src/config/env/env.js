// Invoke 'strict' JavaScript mode
"use strict";

var fs = require('fs');

// Set the 'development' environment configuration object
module.exports = {
    // db: "mongodb://localhost:27017/discord",
    token: process.env.DISCORD_TOKEN,
    prefix: '/',
    symbol: 'ANALOG',
    decimals: 8,
    ws: process.env.RPC_URL, // 
    address_type: 42, // https://github.com/paritytech/substrate/blob/e232d78dd5bafa3bbaae9ac9db08f99e238392db/primitives/core/src/crypto.rs#L444
    mnemonic: process.env.MNEMONIC,
    amount: 1,
    limit: 12, // The time limit for sending requests is in hours.
    channel: process.env.CHANNEL_ID,
};