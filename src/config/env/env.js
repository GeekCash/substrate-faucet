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
    staging_ws: process.env.STAGING_RPC_URL, // url for staging env
    internal_ws: process.env.INTERNAL_RPC_URL, // url for internal env
    address_type: 42, // https://github.com/paritytech/substrate/blob/e232d78dd5bafa3bbaae9ac9db08f99e238392db/primitives/core/src/crypto.rs#L444
    mnemonic: process.env.MNEMONIC,
    amount: 1,
    limit: 12, // The time limit for sending requests is in hours.
    team_channel: process.env.TEAM_CHANNEL_ID, // internal channel for team
    partner_channel: process.env.PARTNER_CHANNEL_ID, // external channel for partners
};