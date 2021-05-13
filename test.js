const Faucet = require('./src/faucet'),
    config = require("./src/config/env/production");


const faucet = new Faucet(config);

setTimeout(function(){

    faucet.send("5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y");

}, 5000);


return;

(async () => {

    const { ApiPromise } = require('@polkadot/api');

    // initialise via static create
    const api = await ApiPromise.create();

    var h = await api.rpc.system.health();

    if(h.isSyncing.eq(false)){
        console.log('synced');
    }

    console.log(JSON.stringify(h));

    


    return;

    // make a call to retrieve the current network head
    api.rpc.chain.subscribeNewHeads(async (header) => {
        // console.log(`Chain is at #${header.number}`);
        // console.log(header);

        var hash = await api.rpc.chain.getBlockHash(header.number);
        var block = await api.rpc.chain.getBlock(hash);
        //    console.log(`Chain is at #${header.number} ${hash}`);
        // console.log(JSON.stringify(block));

        block.block.extrinsics.forEach((ex, index) => {

            //   console.log(ex);

            console.log(index, ex.toHuman());
            console.log('---');

            // the extrinsics are decoded by the API, human-like view
            const { isSigned, meta, method: { args, method, section } } = ex;

            // explicit display of name, args & documentation
            console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
           // console.log(meta.documentation.map((d) => d.toString()).join('\n'));

            // signer/nonce info
            if (isSigned) {
                console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
            }
        });

    });

    // no blockHash is specified, so we retrieve the latest
    //const signedBlock = await api.rpc.chain.getBlock("0x378c6bf922da76a33e090a51b0554bf5df7c4873ff181d3790aff118d813422f");

    // const signedBlock = await api.rpc.chain.getBlock();

    // // the information for each of the contained extrinsics
    // signedBlock.block.extrinsics.forEach((ex, index) => {
    //     // the extrinsics are decoded by the API, human-like view
    //     console.log(index, ex.toHuman());

    //     const { isSigned, meta, method: { args, method, section } } = ex;

    //     // explicit display of name, args & documentation
    //     console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
    //     console.log(meta.documentation.map((d) => d.toString()).join('\n'));

    //     // signer/nonce info
    //     if (isSigned) {
    //         console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
    //     }
    // });


})();
