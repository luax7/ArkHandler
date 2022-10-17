import * as discord from 'discord.js';
import IDGEN from '../Utils/IDGEN';
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
  public Name?: string;
  /**
   * >
   * @description The function that is called when the ArkClient starts
   * 
   * @param Client The client to listen to features
   * @param HandlerClient The ArkClient to get information
   * >
   */
  public Callback!: (client: discord.Client, HandlerClient: HandlerClient) => Promise<void>;
  /**
   * @description Says if the feature is enabled for all the guilds that the bot is 
   */
  public PerServer?: boolean | string[] = false;

}
