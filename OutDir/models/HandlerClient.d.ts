import * as discord from 'discord.js';
/**
 * Defines the default commands embed in the handler
 */
declare type DefaultCommands = 'purge' | 'help' | 'ping';
/**
 *
 * The options of the command handler
 *
 */
declare type HandlerClientOptions = {
    CommandsDirectory?: string;
    FeaturesDirectory?: string;
    MongoConnectionString?: string | undefined;
    Owner?: string;
    RegisterDefaults?: Array<DefaultCommands> | boolean;
    PREFIX?: string;
};
/**
 * The main Ark feature, checks foreach message to check if it triggers a command
 *
 * @param client The discord client to build upon
 * @param options the ark client options @type handlerOptions
 */
export default class HandlerClient {
    readonly client: discord.Client;
    Options: HandlerClientOptions;
    Commands: string[];
    CommandsIndexing: Map<string, number>;
    REST: discord.REST;
    constructor(client: discord.Client, options: HandlerClientOptions);
}
export {};
