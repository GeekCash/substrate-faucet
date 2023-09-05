// Load up the discord.js library
const Discord = require("discord.js"),
    LRU = require("lru-cache"),
    Faucet = require('./faucet'),
    config = require("./config");

const client = new Discord.Client();
const faucet = new Faucet(config);
const team_channel_cache = new LRU();
const partner_channel_cache = new LRU();

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Faucet Bot has started`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    //client.user.setActivity(`...`, { type: 'WATCHING' });
});

client.on("message", async message => {
    if ((message.channel.id != config.team_channel) &&  (message.channel.id != config.partner_channel))return;

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // prefix: !, / and >
    if (!/^(!|\/|>)/.test(message.content)) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    switch (command) {
       
        case "faucet":
            console.log("faucet command");
            let msg = `Sorry please wait for ${config.limit} hours between token requests from the same account!`;
            if (message.channel.id == config.team_channe) {
                if (!team_channel_cache.has(message.author.id)) {
                    // fund the address in staging env for team channel
                    msg = await faucet.send(args[0], message.channel.id == config.team_channel);
                    team_channel_cache.set(message.author.id, 1, 1000 * 60 * 60 * config.limit);
                }
            } else {
                if (!partner_channel_cache.has(message.author.id)) {
                    // fund the address in staging env for team channel
                    msg = await faucet.send(args[0], message.channel.id == config.team_channel);
                    partner_channel_cache.set(message.author.id, 1, 1000 * 60 * 60 * config.limit);
                }
            }
            
            //message.channel.send(msg);
            await message.reply(msg);
            break;

        // case "help":

        //     var msg = fs.readFileSync("./help.txt", 'utf-8');

        //     message.channel.send(msg);
        default:
            await message.reply("command format is !faucet <address>");
            break;
    }


});


client.login(config.token);

