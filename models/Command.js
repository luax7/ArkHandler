"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @sumary The class that defines commands
 */
var CommandInfoClass = /** @class */ (function () {
    function CommandInfoClass() {
        /**
         *
         *  A description of the command
         *
         */
        this.description = "Commando sem descrição";
        /**
         *
         *  The maximum number of arguments that can be passed to the command.
         *
         */
        this.maxArgs = 100;
        /**
         *
         *  The minimum number of arguments that can be passed to the command.
         *
         */
        this.minArgs = 0;
        /**
         *
         *  The name of the command's category.
         *
         */
        this.category = "Comandos";
        /**
         *
         *  Says whether the command is hidden in the help command
         *
         */
        this.hidden = false;
        /**
         *
         *  The tipes of aruments that will be passed to the command
         *
         * It can be a string or an array of strings
         *
         */
        this.ArgsType = 'Striped';
        /**
         *
         * @description The roles that are required for the command to be executed
         *
         */
        this.RequiredRoles = [];
        /**
         *
         * @description The roles that are banned from executing the command
         *
         */
        this.BanedRoles = [];
        /**
         *
         * If the command should be registered as a slash command
         *
         */
        this.Type = 'TextCommand';
    }
    return CommandInfoClass;
}());
exports.default = CommandInfoClass;
//# sourceMappingURL=Command.js.map