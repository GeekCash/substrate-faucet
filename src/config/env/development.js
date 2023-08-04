// Invoke 'strict' JavaScript mode
"use strict";

// Set the 'development' environment configuration object
module.exports = {
    // db: "mongodb://localhost:27017/discord",
    token: "Analog",
    prefix: '/',
    symbol: 'ANALOG',
    decimals: 8,
    ws: 'wss://rpc.internal.analog.one', // 
    address_type: 42, // https://github.com/paritytech/substrate/blob/e232d78dd5bafa3bbaae9ac9db08f99e238392db/primitives/core/src/crypto.rs#L444
    mnemonic: 'link young ...',
    amount: 100000,
    limit: 12 // The time limit for sending requests is in hours.
};