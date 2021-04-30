import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Log {
  readonly id: string;
  readonly user: string;
  readonly description?: string;
  readonly dateTime?: string;
  constructor(init: ModelInit<Log>);
  static copyOf(source: Log, mutator: (draft: MutableModel<Log>) => MutableModel<Log> | void): Log;
}