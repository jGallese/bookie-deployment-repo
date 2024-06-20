import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  GOOGLE_BOOKS_APIKEY: get('GOOGLE_BOOKS_APIKEY').required().asString(),
};
