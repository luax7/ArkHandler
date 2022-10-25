"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var Handler = function (Command, message, client) { return __awaiter(void 0, void 0, void 0, function () {
    var commandInfo, data, CommandName, errs, args, RequireNumber, ActualPerms, AaPermIndex, Perm, RequiredRoles, ActualRoles, RequiredIndex, role, BanedRoles, ActualRoles, BanedIndex, role;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        commandInfo = Command;
        if (commandInfo) {
            console.log(commandInfo);
            data = message.content.split(' ').slice(1);
            CommandName = data.shift();
            errs = 0;
            args = data;
            try {
                /*
                Bate informações do comando com a da mensagem e usuario
        
                Começando pelas permissões necessarias e banidas
                */
                if (commandInfo.RequiredPermissions) /* Permissões necessarias */ {
                    RequireNumber = commandInfo.RequiredPermissions.length - 1;
                    ActualPerms = 0;
                    for (AaPermIndex = 0; AaPermIndex < commandInfo.RequiredPermissions.length; AaPermIndex++) {
                        Perm = commandInfo.RequiredPermissions[AaPermIndex];
                        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(Perm)) {
                            ActualPerms++;
                        }
                    }
                    if (ActualPerms != RequireNumber)
                        errs++;
                }
                if (commandInfo.RequiredRoles) /* Cargos necessarios    */ {
                    RequiredRoles = commandInfo.RequiredRoles.length - 1;
                    ActualRoles = 0;
                    for (RequiredIndex = 0; RequiredIndex < commandInfo.RequiredRoles.length; RequiredIndex++) {
                        role = commandInfo.RequiredRoles[RequiredIndex];
                        if ((_b = message.member) === null || _b === void 0 ? void 0 : _b.roles.cache.get(role)) {
                            ActualRoles++;
                        }
                    }
                    if (ActualRoles != RequiredRoles)
                        errs++;
                }
                if (commandInfo.BanedRoles) /* Cargos banidos        */ {
                    BanedRoles = commandInfo.BanedRoles.length - 1;
                    ActualRoles = 0;
                    for (BanedIndex = 0; BanedIndex < commandInfo.BanedRoles.length; BanedIndex++) {
                        role = commandInfo.BanedRoles[BanedIndex];
                        if ((_c = message.member) === null || _c === void 0 ? void 0 : _c.roles.cache.get(role)) {
                            ActualRoles++;
                        }
                    }
                    if (ActualRoles == BanedRoles) {
                        errs++;
                    }
                }
                /*
                Bate o tipo de argumento que o comando pede
                */
                args = "".concat(commandInfo.ArgsType == 'Joint' ? args = data.join(' ') : args = data);
                /*
                E finalmente para a administraçã
                de argumentos e entradas
                */
                if (commandInfo.minArgs) /* Minimo de comandos necessarios */ {
                    if (data.length < commandInfo.minArgs) {
                        message.reply("Voc\u00EA poucos argumentos , o comando **".concat(CommandName, "** requer no maximo **").concat(commandInfo.minArgs, "** argumentos "));
                        errs++;
                    }
                }
                if (commandInfo.maxArgs) /* Maximo de comandos de necessarios*/ {
                    if (data.length > commandInfo.maxArgs) {
                        message.reply("Voc\u00EA enviou muitos argumentos , o comando **".concat(CommandName, "** requer apenas **").concat(commandInfo.maxArgs, "** argumentos "));
                        errs++;
                    }
                }
            }
            finally {
                /*
                            Executa a função
                        */
                commandInfo.Callback(message, args, client);
            }
        }
        return [2 /*return*/];
    });
}); };
exports.default = Handler;
//# sourceMappingURL=Handler.js.map