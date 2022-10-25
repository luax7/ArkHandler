import { Command } from "../..";

export default {

    Callback(Message, Args, Client) {
        Message.reply("Pong!")
    },

} as Command