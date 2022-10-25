import { Embed, EmbedBuilder } from "discord.js";
import { Command } from "../..";

export default {

hidden: true,

Callback(Message, Args, Client) {
    const embed = new EmbedBuilder()

    console.log(Args[0])

    if(Args[0]){
        if(require(Client.Commands[ Client.CommandsIndexing.get(Args[0])! ])){
            const Command = require(Client.Commands[ Client.CommandsIndexing.get(Args[0])!]).default as Command;

            embed.setTitle(Args[0])

            if(Command.description){
                embed.setDescription(Command.description)
            }
            if(Command.category){
                embed.addFields([
                    {
                        name: "Category",
                        value: Command.category || "Non-Categorized",
                    }
                ])
            }
            if(Command.Aliases){
                let aliaseslist = ''

                for(const alias of Command.Aliases){

                    aliaseslist += alias
                    aliaseslist += ', '

                }

                embed.addFields([
                    {
                        name: "Alias",
                        value: aliaseslist,
                        inline: true
                    }
                ])
            }
            if(Command.maxArgs || Command.minArgs){
                embed.addFields({
                    name: "Quantidade de argumentos",
                    value: `Minimo: ${Command.minArgs || 0} **|** ${Command.maxArgs || 0}`,
                    inline: true
                })
            }

        }
    }else{

    }

    Message.channel.send({
        embeds: [embed]
    })

    return
},

} as Command