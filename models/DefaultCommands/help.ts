import { EmbedBuilder } from "@discordjs/builders";
import { Command } from "../..";
import * as fs from 'fs'



export default {

hidden: true,


Callback(Message, Args, Client) {
    if(!Client.Options.RegisterDefaults) return; else
    if(!Client.Options.CommandsDirectory) return;

    const embed = new EmbedBuilder()
    .setTitle(`Comandos de ${Client.client.user?.username}`)
    .setFooter({
        iconURL: Message.guild?.members.me?.avatarURL() as string,
        text: `${Client.client.user?.username}`
    })
    ;

    const files1 = fs.readdirSync(Client.Options.CommandsDirectory)

    let rows = []

    for(let i = 0; i < files1.length; i++){
        const row = i % 5

        const file = files1[i];
        const CommandInfo = require(Client.Options.CommandsDirectory + `/${file}`).default as Command

        rows[row]
        
    }

    console.log({rows})

    const message = Message.reply({
        embeds: [embed]
    })




},

} as Command