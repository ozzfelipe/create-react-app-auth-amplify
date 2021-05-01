import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly snsTopicArn: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Log {
  readonly id: string;
  readonly user: string;
  readonly description?: string;
  readonly dateTime?: string;
  constructor(init: ModelInit<Log>);
  static copyOf(source: Log, mutator: (draft: MutableModel<Log>) => MutableModel<Log> | void): Log;
}