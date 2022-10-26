import * as discord from 'discord.js'
import * as fs from 'fs'
import {Command, Feature} from '../'
import Handler from '../Handler';

/**
 * Defines the default commands embed in the handler
 */
 type DefaultCommands = 'purge'|'help'|'ping';
/**
 * 
 * The options of the command handler
 * 
 */
type HandlerClientOptions = {
  CommandsDirectory?: string;
  FeaturesDirectory?: string;

  MongoConnectionString?: string | undefined;
  Owner?: string;

  RegisterDefaults?: Array<DefaultCommands> | boolean;

  PREFIX? : string ;
}



/**
 * The main Ark feature, checks foreach message to check if it triggers a command
 * 
 * @param client The discord client to build upon
 * @param options the ark client options @type handlerOptions
 */
export default class HandlerClient {
  public readonly client: discord.Client;
  public Options: HandlerClientOptions;
  public Commands : string[] = [];
  public CommandsIndexing : Map<string, number> = new Map();
  public REST : discord.REST = new discord.REST({version: '10'})

  constructor(client: discord.Client, options: HandlerClientOptions) {
    this.Options = options
    this.client = client
    this.REST.setToken(client.token as string)

    /**
     * 
     * Register the in <CommandsDirectory>
     * Uses the format
     * 
     *    | ------------------------------- |
     *    |  Registrando comando <Command>  |
     *    | ------------------------------- |
     *  
     * ➡ Registering Alias <Alias>
     * 
     * 
     * Also registers the default commands according to <RegisterDefaults>
     */
    if(options.CommandsDirectory){



      //Starts registering the commands in the folder
      const files = fs.readdirSync(this.Options.CommandsDirectory!)
      for(const file of files){

        /**
         * 
         * Seeks for the commands in the folder
         * 
         *  | |
         *  | |Then registers it in the Local Commands Array as a Path
         *  | |Like C:\\NiceAndBeatyfulPath\\commands/Command
         *  | |
         *  | |Register a Alias or Command in the local coomandIndexing Map
         *  | |With this format: | <Alias or Name> => Index in the Commands var |
         *  | |
         * 
         */
        const ThisInfo = require(this.Options.CommandsDirectory + '/' + file).default as Command;
        this.Commands.push(this.Options.CommandsDirectory + '/' + file)

        this.CommandsIndexing.set(file.slice(0,-3),this.Commands.length-1)


        //#region Beauty bullshit
        const consolelength = `Registrando comando <${file.slice(0,-3)}>`.length
        let str = '|'
        for(var i = 0; i < consolelength+1;i++){
          str += '-'
        }
        str += '|'

        console.log((str))
        console.log(("|") + ((`Registrando comando ` + ("<" + file.slice(0,-3) + '>'))) + (' |'))
        console.log((str))
        
        console.log('')
        //#endregion
        
        //Aliases
        if(ThisInfo.Aliases){
          ThisInfo.Aliases.forEach((element : string) => {
            console.log('➡ Registrando Alias ' + element)
            this.CommandsIndexing.set(element,this.Commands.length-1)
          })
          console.log('')
        }
        
      }

      /**
       * 
       * After that register the Default Commands in the same way as the normal commands
       * but now, using the relative path
       * 
       */
        if(this.Options.RegisterDefaults){
          if(typeof this.Options.RegisterDefaults === 'boolean'){
        const files2 = fs.readdirSync(__dirname + "/DefaultCommands");

          for(const  file of files2){
            this.Commands.push(__dirname + '/DefaultCommands/'+file)
            this.CommandsIndexing.set(file.slice(0,-3),this.Commands.length-1)
          }
        }else{
          this.Options.RegisterDefaults.forEach((element) => {
          
            this.Commands.push(__dirname + '/DefaultCommands/'+element+'.ts')
            this.CommandsIndexing.set(element,this.Commands.length-1)

          })

          console.log(this.CommandsIndexing)

        }

        console.log(("Registering default commands"))
      }

      console.log(("|>-----------#  #------------<|"))
      console.log(' ')
      /**
       * 
       * Loops through all the features that are available
       * and seting it on
       * 
       */
      if(this.Options.FeaturesDirectory){
        console.log(" " +  ( "Registrando Features"))

        const feats = fs.readdirSync(this.Options.FeaturesDirectory)

        for(const FeatName of feats) {
          const feat = require(this.Options.FeaturesDirectory + `/${FeatName}`).default as Feature;
          console.log(`Registrando feature : ` +  (FeatName.slice(0,-3)));
          feat.Callback(this.client,this)
        }

      }

      /**
       * 
       * if the client has Commands available, then sets a listener
       * to hear for all the messages in available channels that start with the given prefix
       * 
       */
      if(this.Commands.length > 0){
        this.client.on('messageCreate', (message) => {
          if(message.content.toLowerCase().startsWith(this.Options.PREFIX || 'calltest')){
            const data = message.content.split(' ')
            
            const prefix = data.shift();
            const commandName = data.shift();
            
            if(!commandName) return

            
            if(this.CommandsIndexing.has(commandName)){
              const command = require( this.Commands[this.CommandsIndexing.get(commandName)!]).default as Command
              Handler(command,message,this)
            }
          }
        })
      }
    


    }//Roda por todos os comandos fazendo as configurações iniciais
    
  }

}