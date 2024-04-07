import dotenv from 'dotenv'; 

dotenv.config();

import { Client, Databases, ID , Functions} from 'appwrite';
//import { response } from 'express';

/**
 * Initializes a new Appwrite client.
 *
 * @param {Object} config - The configuration object.
 * @param {string} config.endpoint - The endpoint URL of the Appwrite server. 
 * @param {string} config.project - The project ID.
 * @param {string} [config.key] - The project API key.
 * @param {string} [config.locale] - The Appwrite locale code. 
 * @returns {Client} The Appwrite client instance.
 */


const apiEndpoint = process.env.API_ENDPOINT;
const projectId = process.env.API_PROJECT_ID;
const databaseKey = process.env.API_DATABASE_KEY;
const collectionKey = process.env.API_COLLECTION_KEY;
const functionId = process.env.API_FUNCTION_ID;

//console.log(apiEndpoint, projectId, databaseKey, collectionKey);


const client = new Client();

client
    .setEndpoint(apiEndpoint)
    .setProject(projectId);

const functions = new Functions(client);

(async () => {
    const result = await functions.createExecution(functionId);
    console.log(result);
  })();
  
