import * as discord from 'discord.js';
import { Snowflake, SlashCommandBuilder } from 'discord.js';
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
    description?: string;
    /**
     *
     */
    Aliases?: string[];
    /**
     *
     *  The maximum number of arguments that can be passed to the command.
     *
     */
    maxArgs?: number;
    /**
     *
     *  The minimum number of arguments that can be passed to the command.
     *
     */
    minArgs?: number;
    /**
     *
     *  The name of the command's category.
     *
     */
    category?: string;
    /**
     *
     *  Says whether the command is hidden in the help command
     *
     */
    hidden?: boolean;
    /**
     *  The main part of the command that is executed
     *
     * @param Message - The message that triggered the command
     *
     * @param Args - The arguments that will be passed to the command
     *
     * @param Client - The project client
     *
     */
    Callback: (Message: discord.Message, Args: string | string[], Client: HandlerClient) => Promise<void>;
    /**
     *
     *  The tipes of aruments that will be passed to the command
     *
     * It can be a string or an array of strings
     *
     */
    ArgsType?: 'Striped' | 'Joint';
    /**
     *
     * @description The roles that are required for the command to be executed
     *
     */
    RequiredRoles?: Snowflake[] | string[];
    /**
     *
     * @description The roles that are banned from executing the command
     *
     */
    BanedRoles?: Snowflake[] | string[];
    /**
     *
     * @description The permissions that are required for the command to be executed
     *
     */
    RequiredPermissions?: discord.PermissionResolvable[];
    /**
     *
     * If the command should be registered as a slash command
     *
     */
    Type?: 'SlashCommand' | 'TextCommand' | 'Both';
    /**
     *
     * The slash command info that should be executed
     *
     * (Not necessary if your not using the command as a slash command)
     */
    SlashData?: SlashCommandBuilder;
}
