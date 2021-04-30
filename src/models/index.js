// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Log } = initSchema(schema);

export {
  Log
};