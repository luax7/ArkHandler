export default class HandlerClientOptions {
  public CommandsDirectory?: string;
  public FeaturesDirectory?: string;

  public MongoConnectionString?: string | undefined;
  public Owner!: string;

  public RegisterDefaults?: boolean = true;
  public PREFIX? : string = "!"

}
