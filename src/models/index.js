// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Log } = initSchema(schema);

export {
  User,
  Log
};