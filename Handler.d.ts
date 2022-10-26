import HandlerClient from './models/HandlerClient';
import { Command } from '.';
declare const Handler: (Command: Command, message: discordjs.Message, client: HandlerClient) => Promise<void>;
export default Handler;
