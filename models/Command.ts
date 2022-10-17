import  * as discord from 'discord.js';
import { Snowflake, SlashCommandBuilder} from 'discord.js';
import HandlerClient from './HandlerClient';

/**
 * @sumary The class that defines commands
 */
export default class CommandInfoClass {
  /**
   * 
   *  A description of the command
   * 
   */
  public description?: string = "Commando sem descrição";
  /**
   * 
   */
  public Aliases? : string[];
  /**
   * 
   *  The maximum number of arguments that can be passed to the command.
   * 
   */
  public maxArgs?: number = 100;
  /**
   * 
   *  The minimum number of arguments that can be passed to the command.
   * 
   */
  public minArgs?: number = 0;
  /**
   * 
   *  The name of the command's category.
   * 
   */
  public category?: string = "Comandos";
  /**
   * 
   *  Says whether the command is hidden in the help command
   * 
   */
  public hidden?: boolean = false;
  /**
   * @sumary The main part of the command that is executed
   * 
   * @param Message - The message that triggered the command
   * 
   * @param Args - The arguments that will be passed to the command
   * 
   * @param Client - The project client
   * 
   * @returns true if the command was executed successfully, otherwise false
   */
  public Callback!: (Message: discord.Message, Args: string | string[], Client: HandlerClient) => Promise<void>;
  /**
   * 
   *  The tipes of aruments that will be passed to the command
   * 
   * It can be a string or an array of strings
   * 
   */
  public ArgsType?: 'Striped' | 'Joint' = 'Striped';
  /**
   * 
   * @description The roles that are required for the command to be executed
   * 
   */
  public RequiredRoles?: Snowflake[] | string[] = [];
  /**
   * 
   * @description The roles that are banned from executing the command
   * 
   */
  public BanedRoles?: Snowflake[] | string[] = [];
  /**
   * 
   * @description The permissions that are required for the command to be executed
   * 
   */
  public RequiredPermissions?: discord.PermissionResolvable[] ;
  /**
   * 
   * If the command should be registered as a slash command
   * 
   */
  public Type? : 'SlashCommand' | 'TextCommand' | 'Both' = 'TextCommand';
  /**
   * 
   * The slash command info that should be executed
   * 
   * (Not necessary if your not using the command as a slash command)
   */
  public SlashData?: SlashCommandBuilder
}
