# Substrate Faucet with Discord Bot and Node.js

Read guide: https://morioh.com/p/34ace45c86d3

## configuration
configure file in src/config/env/development.js
amount: the user receives each time
limit: The time limit for sending requests is in hours.


### Environment variables

To make the runtime more reusable, the following env variables should be supplied:

- RPC_URL - URL path to RPC node
- CHANNEL_ID - Discord channel ID
- MNEMONIC - Seed phrase for the token sender account
- DISCORD_TOKEN - Auth token from Discord to authenticate the bot

## compile bot
```
npm run build
```

## run bot
```
RPC_URL="..."       \
CHANNEL_ID="..."    \
MNEMONIC="..."      \
DISCORD_TOKEN="..." \
npm run start
```
