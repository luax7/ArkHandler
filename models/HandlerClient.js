"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord = require("discord.js");
var fs = require("fs");
var Handler_1 = require("../Handler");
var chalk_1 = require("chalk");
/**
 * The main Ark feature, checks foreach message to check if it triggers a command
 *
 * @param client The discord client to build upon
 * @param options the ark client options @type handlerOptions
 */
var HandlerClient = /** @class */ (function () {
    function HandlerClient(client, options) {
        var _this = this;
        this.Commands = [];
        this.CommandsIndexing = new Map();
        this.REST = new discord.REST({ version: '10' });
        this.Options = options;
        this.client = client;
        this.REST.setToken(client.token);
        if (options.CommandsDirectory) {
            var files = fs.readdirSync(this.Options.CommandsDirectory);
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                var ThisInfo = require(this.Options.CommandsDirectory + '/' + file).default;
                this.Commands.push(this.Options.CommandsDirectory + '/' + file);
                this.CommandsIndexing.set(file.slice(0, -3), this.Commands.length - 1);
                var consolelength = "Registrando comando <".concat(file.slice(0, -3), ">").length;
                var str = '|';
                for (var i = 0; i < consolelength + 1; i++) {
                    str += '-';
                }
                str += '|';
                console.log(chalk_1.default.blue(str));
                console.log(chalk_1.default.blue("|") + chalk_1.default.green(chalk_1.default.underline("Registrando comando " + chalk_1.default.bold("<" + file.slice(0, -3) + '>'))) + chalk_1.default.blue(' |'));
                console.log(chalk_1.default.blue(str));
                console.log('');
                if (ThisInfo.Aliases) {
                    ThisInfo.Aliases.forEach(function (element) {
                        console.log('➡ Registrando Alias ' + element);
                        _this.CommandsIndexing.set(element, _this.Commands.length - 1);
                    });
                    console.log('');
                }
            }
            if (this.Options.RegisterDefaults) {
                if (typeof this.Options.RegisterDefaults === 'boolean') {
                    var files2 = fs.readdirSync(__dirname + "/DefaultCommands");
                    for (var _a = 0, files2_1 = files2; _a < files2_1.length; _a++) {
                        var file = files2_1[_a];
                        this.Commands.push(__dirname + '/DefaultCommands/' + file);
                        this.CommandsIndexing.set(file.slice(0, -3), this.Commands.length - 1);
                    }
                }
                else {
                    this.Options.RegisterDefaults.forEach(function (element) {
                        _this.Commands.push(__dirname + '/DefaultCommands/' + element + '.ts');
                        _this.CommandsIndexing.set(element, _this.Commands.length - 1);
                    });
                    console.log(this.Commands);
                }
                console.log(chalk_1.default.bgCyan("Registering default commands"));
            }
            console.log(chalk_1.default.blue("|>-----------#  #------------<|"));
            console.log(' ');
            console.log(" " + chalk_1.default.bold(chalk_1.default.underline(chalk_1.default.green("Registrando Features"))));
            if (this.Options.FeaturesDirectory) {
                var feats = fs.readdirSync(this.Options.FeaturesDirectory);
                for (var _b = 0, feats_1 = feats; _b < feats_1.length; _b++) {
                    var FeatName = feats_1[_b];
                    var feat = require(this.Options.FeaturesDirectory + "/".concat(FeatName)).default;
                    console.log("Registrando feature : " + chalk_1.default.bold(FeatName.slice(0, -3)));
                    feat.Callback(this.client, this);
                }
            }
            if (this.Options.CommandsDirectory) {
                this.client.on('messageCreate', function (message) {
                    if (message.content.toLowerCase().startsWith(_this.Options.PREFIX || 'calltest')) {
                        var data = message.content.split(' ');
                        var prefix = data.shift();
                        var commandName = data.shift();
                        if (!commandName)
                            return;
                        if (_this.CommandsIndexing.has(commandName)) {
                            var command = require(_this.Commands[_this.CommandsIndexing.get(commandName)]).default;
                            (0, Handler_1.default)(command, message, _this);
                        }
                    }
                });
            }
        } //Roda por todos os comandos fazendo as configurações iniciais
    }
    return HandlerClient;
}());
exports.default = HandlerClient;
//# sourceMappingURL=HandlerClient.js.map