<h1> ArkHandler </h1>


<h2> Arkhandler is a helper for discord bot creation, its use is simple and intuitive and performance is the best among others </h2>

#### Usage


<h3> First, we create the discord client instance and set it up and running </h3>
```Javascript
  
  const Client = new discord.Client({
    intents: 
    [
        discord.IntentsBitField.Flags.MessageContent,
        discord.IntentsBitField.Flags.Guilds,
        discord.IntentsBitField.Flags.GuildMessages,
    ]

})

```
###### Note that this is the bare minimum for the handler work, you can server your needs as you wish

<h3> Next, its time to create our Ark Handler intance </h3>

```Javascript

  const Handler = new Ark(Client,{
    Owner: "YourName#123",
    CommandsDirectory: __dirname + '/commands',
    FeaturesDirectory: __dirname + '/features',
    PREFIX: "!",
    RegisterDefaults: true
})

```

