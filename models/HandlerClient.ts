import * as discord from 'discord.js'
import EventEmitter from 'events';
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
export default class HandlerClient extends EventEmitter {
  public readonly client: discord.Client;
  public Options: HandlerClientOptions;
  public CommandsIndexing : Map<string, number> = new Map();
  public Commands : Command[] = [];
  public REST : discord.REST = new discord.REST({version: '10'})

  public AddCommand(CommandName : string, commandObject : Command){

    this.Commands.push(commandObject)
    this.CommandsIndexing.set(CommandName.endsWith('.ts') ? CommandName.slice(0,-3) : CommandName, this.Commands.length - 1 )

    if(commandObject.Aliases) {
      commandObject.Aliases.forEach((Alias) => {
        this.CommandsIndexing.set(Alias, this.Commands.length - 1 )
      })
    }
    console.log(this.CommandsIndexing)
  }

  constructor(client: discord.Client, options: HandlerClientOptions) {
    super({captureRejections : true})

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
    if(this.Options.CommandsDirectory){
      for(const CommandName of fs.readdirSync(this.Options.CommandsDirectory)){

        console.log("Registering command: " + CommandName.slice(0,-3))
        if(!CommandName.endsWith(".ts")) continue;
        const command = require(this.Options.CommandsDirectory + `/${CommandName}`).default as Command
        
        if(command instanceof Command) {
        this.AddCommand(CommandName, command)}
      } 
      /**
       * Register the default command(s) 
       */
      if(typeof this.Options.RegisterDefaults === "boolean" || typeof this.Options.RegisterDefaults === "undefined"){
        if(this.Options.RegisterDefaults === true || this.Options.RegisterDefaults === undefined){
          console.log("Registrando comandos padrões")
          for(const DefaultCommand of fs.readdirSync(__dirname + "/DefaultCommands/")){
            if(!DefaultCommand.endsWith(".ts")) continue;

            this.AddCommand(DefaultCommand, require(`./DefaultCommands/${DefaultCommand}`).default as Command)
          }
        }
      } else {
        for(const DefaultCommand of fs.readdirSync(__dirname + "/DefaultCommands/")){
          this.Options.RegisterDefaults.forEach((element) => {
            if(DefaultCommand.slice(0,-3) === element){
              this.AddCommand(DefaultCommand, require(`./DefaultCommands/${element}.ts`).default as Command)
            }
          })
        }
      }
      /**
       * -------------------
       * Register Features
       */
      if(this.Options.FeaturesDirectory){
        console.log("Registando Features");
        
        for(const feature of fs.readdirSync(this.Options.FeaturesDirectory)) {

          const featureObject = require(`${this.Options.FeaturesDirectory}/${feature}`).default as Feature;
          console.log(`Registrando feature : ${feature}`)

          featureObject.Callback(this.client , this)

        }
      }
      /**
       * Listener for commands
       */
      if(this.Options.CommandsDirectory) {
        this.client.on('messageCreate', (message) => {
          if(message.content.split(' ').join('').toLowerCase().startsWith(this.Options.PREFIX || "test")){
            const CommandName = message.content.slice(this.Options.PREFIX?.length).trim()
            
            if(this.CommandsIndexing.has(CommandName)){
              const CommandObject = this.Commands[this.CommandsIndexing.get(CommandName)!]

              Handler(CommandObject,message,this)
            }

          }
        })
      }

    }
    
  }

}