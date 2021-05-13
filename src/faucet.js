
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api"),
    { BN } = require("bn.js"),
    crypto = require("@polkadot/util-crypto");

module.exports = class Faucet {

    constructor(config) {
        this.config = config;
        this.api = null;
        this.init();
    };

    async init() {


        const ws = new WsProvider(this.config.ws);
        // this.api = await ApiPromise.create({ types: types, provider: ws });
        this.api = await ApiPromise.create({ provider: ws });
        // Retrieve the chain & node information information via rpc calls
        const [chain, nodeName, nodeVersion] = await Promise.all([
            this.api.rpc.system.chain(),
            this.api.rpc.system.name(),
            this.api.rpc.system.version(),
        ]);
        // Log these stats
        console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    };

    async send(address) {

        const check = crypto.checkAddress(address, this.config.address_type);

        if (check[0]) {
            const keyring = new Keyring({ type: "sr25519" });
            const sender = keyring.addFromUri(this.config.mnemonic);
            // const sender = keyring.addFromUri('//Alice');
            const padding = new BN(10).pow(new BN(this.config.decimals));
            const amount = new BN(this.config.amount).mul(padding);
            console.log(`Sending ${this.config.amount} ${this.config.symbol} to ${address}`);
            const tx = await this.api.tx.balances.transferKeepAlive(address, amount).signAndSend(sender);
            console.log("Transfer sent with hash", tx.toHex());
            return `Done! Transfer ${this.config.amount} ${this.config.symbol} to ${address} with hash ${tx.toHex()}`;
        }

        return `Invalid address! Plese use the Geek network format with address type ${this.config.address_type}! >> <https://my.geekcash.org/#/accounts>`;

    }


};