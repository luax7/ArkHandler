import * as discord from 'discord.js';
import HandlerClient from './HandlerClient';
/**
 *
 * Features are listeners of the client.
 *
 */
export default class Features {
    /**
     * @description The name of the feature
     */
    Name?: string;
    /**
     * >
     * @description The function that is called when the ArkClient starts
     *
     * @param Client The client to listen to features
     * @param HandlerClient The ArkClient to get information
     * >
     */
    Callback: (client: discord.Client, HandlerClient: HandlerClient) => Promise<void>;
    /**
     * @description Says if the feature is enabled for all the guilds that the bot is
     */
    PerServer?: boolean | string[];
}
