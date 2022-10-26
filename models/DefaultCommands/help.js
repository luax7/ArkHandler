"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    hidden: true,
    Callback: function (Message, Args, Client) {
        var embed = new discord_js_1.EmbedBuilder();
        console.log(Args[0]);
        if (Args[0]) {
            if (require(Client.Commands[Client.CommandsIndexing.get(Args[0])])) {
                var Command_1 = require(Client.Commands[Client.CommandsIndexing.get(Args[0])]).default;
                embed.setTitle(Args[0]);
                if (Command_1.description) {
                    embed.setDescription(Command_1.description);
                }
                if (Command_1.category) {
                    embed.addFields([
                        {
                            name: "Category",
                            value: Command_1.category || "Non-Categorized",
                        }
                    ]);
                }
                if (Command_1.Aliases) {
                    var aliaseslist = '';
                    for (var _i = 0, _a = Command_1.Aliases; _i < _a.length; _i++) {
                        var alias = _a[_i];
                        aliaseslist += alias;
                        aliaseslist += ', ';
                    }
                    embed.addFields([
                        {
                            name: "Alias",
                            value: aliaseslist,
                            inline: true
                        }
                    ]);
                }
                if (Command_1.maxArgs || Command_1.minArgs) {
                    embed.addFields({
                        name: "Quantidade de argumentos",
                        value: "Minimo: ".concat(Command_1.minArgs || 0, " **|** ").concat(Command_1.maxArgs || 0),
                        inline: true
                    });
                }
            }
        }
        else {
        }
        Message.channel.send({
            embeds: [embed]
        });
        return;
    },
};
//# sourceMappingURL=help.js.map