import * as discordjs from 'discord.js';
import * as dotenv from 'dotenv';
import HandlerClient from './models/HandlerClient';
import { Command } from '.';

dotenv.config()

const Handler = async (Command : Command, message: discordjs.Message, client: HandlerClient) => {

    const commandInfo : Command = Command

      if(commandInfo){

        console.log(commandInfo)
      
        const data = message.content.split(' ').slice(1);
        const CommandName = data.shift();


      let errs = 0
      let args: string[] | string = data;
      try {
        /*
        Bate informações do comando com a da mensagem e usuario

        Começando pelas permissões necessarias e banidas
        */
       if(commandInfo.RequiredPermissions) /* Permissões necessarias */ {
        const RequireNumber = commandInfo.RequiredPermissions.length-1;
        let ActualPerms = 0

         for(var AaPermIndex = 0; AaPermIndex < commandInfo.RequiredPermissions.length; AaPermIndex++){

          const Perm = commandInfo.RequiredPermissions[AaPermIndex];

          if(message.member?.permissions.has(Perm)){
            ActualPerms++
          }

         }
         if(ActualPerms != RequireNumber) errs++
       }
       if(commandInfo.RequiredRoles)       /* Cargos necessarios    */  {
        const RequiredRoles = commandInfo.RequiredRoles.length-1
        let ActualRoles = 0
        for(var RequiredIndex = 0; RequiredIndex < commandInfo.RequiredRoles.length; RequiredIndex++){
          const role = commandInfo.RequiredRoles[RequiredIndex]

          if(message.member?.roles.cache.get(role)){
            ActualRoles++
          }
        }

        if(ActualRoles != RequiredRoles) errs++

       } 
       if(commandInfo.BanedRoles)          /* Cargos banidos        */  {
        const BanedRoles = commandInfo.BanedRoles.length-1
        let ActualRoles = 0
        for(var BanedIndex = 0; BanedIndex < commandInfo.BanedRoles.length; BanedIndex++){
          const role = commandInfo.BanedRoles[BanedIndex]

          if(message.member?.roles.cache.get(role)){
            ActualRoles++
          }
        }
        if(ActualRoles == BanedRoles){
          errs++
        } 
       }

       /*
       Bate o tipo de argumento que o comando pede
       */

       switch(commandInfo.ArgsType){
        case('Joint'):
           args = data.join(' ')
        break;
        case('Striped'):
           args = data
        break;
       }

       /*
       E finalmente para a administraçã
       de argumentos e entradas
       */

       if(commandInfo.minArgs)            /* Minimo de comandos necessarios */{
        if(data.length < commandInfo.minArgs){
          message.reply(`Você poucos argumentos , o comando **${CommandName}** requer no maximo **${commandInfo.minArgs}** argumentos `)

          errs++
        }
       }

       if(commandInfo.maxArgs)            /* Maximo de comandos de necessarios*/{
        if(data.length > commandInfo.maxArgs){
          message.reply(`Você enviou muitos argumentos , o comando **${CommandName}** requer apenas **${commandInfo.maxArgs}** argumentos `)

          errs++
        }
       }

      } finally {
        /*
                    Executa a função 
                */
          commandInfo.Callback(message, args!, client);
      }
    }
  }


export default Handler;
