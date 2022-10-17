import * as discord from 'discord.js'
import handlerOptions from './HandlerClientOptions';
import * as fs from 'fs'
import {Command, Feature} from '../'
import Handler from '../Handler';
import chalk from 'chalk'
/**
 * The main Ark feature, checks foreach message to check if it triggers a command
 * 
 * @param client The discord client to build upon
 * @param options the ark client options @type handlerOptions
 */

export default class HandlerClient {
  public readonly client: discord.Client;
  public Options: handlerOptions;
  private Commands : string[] = [];
  private CommandsIndexing : Map<string, number> = new Map();
  public REST : discord.REST = new discord.REST({version: '10'})

  constructor(client: discord.Client, options: handlerOptions) {
    this.Options = options
    this.client = client
    this.REST.setToken(client.token as string)

    if(options.CommandsDirectory){
      const files = fs.readdirSync(this.Options.CommandsDirectory!)

      for(const file of files){
        const ThisInfo = require(this.Options.CommandsDirectory + '/' + file).default as Command;
        this.Commands.push(file)
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
              const command = require(this.Options.CommandsDirectory! + `/${this.Commands[this.CommandsIndexing.get(commandName) as number]}`).default as Command
              Handler(command,message,this)
            }
          }
        })
      }
    


    }//Roda por todos os comandos fazendo as configurações iniciais
    

  }

}
