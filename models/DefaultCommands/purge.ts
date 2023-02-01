import { Command } from "../..";
import {TextChannel} from 'discord.js'


export default {
    RequiredPermissions:["ManageMessages"],
    Callback({
        Args,
        Message
    }) {
        let number = parseInt(Args[0])

        if(number > 99 ) number = 99;

        const channel = Message.channel as TextChannel;

        channel.bulkDelete(number).then(async(err) => {
            if (err) return;
            const msg = await channel.send("Mensagens deletadas")

            setTimeout(() => {
                msg.delete()
            },10 * 1000)

        })
    },
} as Command