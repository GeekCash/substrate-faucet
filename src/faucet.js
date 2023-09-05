
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api"),
    { BN } = require("bn.js"),
    crypto = require("@polkadot/util-crypto");

module.exports = class Faucet {

    constructor(config) {
        this.config = config;
        this.staging_api = null;
        this.internal_api = null;
        this.init();
    };

    async init() {
        const staging_ws = new WsProvider(this.config.staging_ws);
        const internal_ws = new WsProvider(this.config.internal_ws);
        // this.api = await ApiPromise.create({ types: types, provider: ws });
        this.staging_api = await ApiPromise.create({ provider: staging_ws });
        this.internal_api = await ApiPromise.create({ provider: internal_ws });

        // Retrieve the chain & node information information via rpc calls
        const [staging_chain, staging_node, staging_version] = await Promise.all([
            this.staging_api.rpc.system.chain(),
            this.staging_api.rpc.system.name(),
            this.staging_api.rpc.system.version(),
        ]);

        console.log(`You are connected to staging chain ${staging_chain} using ${staging_node} v${staging_ersion}`);

        const [internal_chain, internal_node, internal_version] = await Promise.all([
            this.internal_api.rpc.system.chain(),
            this.internal_api.rpc.system.name(),
            this.internal_api.rpc.system.version(),
        ]);
        console.log(`You are connected to internal chain ${internal_chain} using ${internal_node} v${internal_version}`);

    };

    async send(address, staging_tx) {

        const check = crypto.checkAddress(address, this.config.address_type);

        if (check[0]) {
            const keyring = new Keyring({ type: "sr25519" });
            const sender = keyring.addFromUri(this.config.mnemonic);
            // const sender = keyring.addFromUri('//Alice');
            const padding = new BN(10).pow(new BN(this.config.decimals));
            const amount = new BN(this.config.amount).mul(padding);
            console.log(`Sending ${this.config.amount} ${this.config.symbol} to ${address}`);
            const tx = await this.internal_api.tx.balances.transferKeepAlive(address, amount).signAndSend(sender);
            console.log("Transfer sent with hash", tx.toHex());
            let message = `Done!\nIn internal network, transfer ${this.config.amount} ${this.config.symbol} to ${address} with hash ${tx.toHex()}\n`;

            if (staging_tx) {
                const tx = await this.staging_api.tx.balances.transferKeepAlive(address, amount).signAndSend(sender);
                console.log("Transfer sent with hash", tx.toHex());
                message += `In staging network, Transfer ${this.config.amount} ${this.config.symbol} to ${address} with hash ${tx.toHex()}\n`;
            }

            return message;
        }

        return `Invalid address! Plese use the Geek network format with address type ${this.config.address_type}! >> <https://my.geekcash.org/#/accounts>`;

    }
};