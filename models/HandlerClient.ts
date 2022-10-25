import * as discord from 'discord.js'
import * as fs from 'fs'
import {Command, Feature} from '../'
import Handler from '../Handler';
import chalk from 'chalk'

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

    if(options.CommandsDirectory){
      const files = fs.readdirSync(this.Options.CommandsDirectory!)

      for(const file of files){
        const ThisInfo = require(this.Options.CommandsDirectory + '/' + file).default as Command;
        this.Commands.push(this.Options.CommandsDirectory + '/' + file)

        this.CommandsIndexing.set(file.slice(0,-3),this.Commands.length-1)

        const consolelength = `Registrando comando <${file.slice(0,-3)}>`.length
        let str = '|'
        for(var i = 0; i < consolelength+1;i++){
          str += '-'
        }
        str += '|'

        console.log(chalk.blue(str))
        console.log(chalk.blue("|") + chalk.green(chalk.underline(`Registrando comando ` + chalk.bold("<" + file.slice(0,-3) + '>'))) + chalk.blue(' |'))
        console.log(chalk.blue(str))
        
        console.log('')

        if(ThisInfo.Aliases){
          
          ThisInfo.Aliases.forEach((element : string) => {
            console.log('➡ Registrando Alias ' + element)
            this.CommandsIndexing.set(element,this.Commands.length-1)
          })
          console.log('')
        }
        
      }


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

          console.log(this.Commands)

        }

        console.log(chalk.bgCyan("Registering default commands"))
      }

      console.log(chalk.blue("|>-----------#  #------------<|"))
      console.log(' ')
      console.log(" " + chalk.bold(chalk.underline(chalk.green("Registrando Features"))))

      if(this.Options.FeaturesDirectory){

        const feats = fs.readdirSync(this.Options.FeaturesDirectory)

        for(const FeatName of feats) {
          const feat = require(this.Options.FeaturesDirectory + `/${FeatName}`).default as Feature;
          console.log(`Registrando feature : ` + chalk.bold(FeatName.slice(0,-3)));
          feat.Callback(this.client,this)
        }

      }

      if(this.Options.CommandsDirectory){
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