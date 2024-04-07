import { Client, Databases, ID , Functions} from 'appwrite';

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

const apiEndpoint = import.meta.env.API_ENDPOINT;
const projectId = import.meta.env.API_PROJECT_ID;
const databaseKey = import.meta.env.API_DATABASE_KEY;
const collectionKey = import.meta.env.API_COLLECTION_KEY;
const functionId = import.meta.env.API_FUNCTION_ID;

//console.log(apiEndpoint, projectId, databaseKey, collectionKey);


const client = new Client();

client
    .setEndpoint(apiEndpoint)
    .setProject(projectId);

const functions = new Functions(client);

const result = await functions.createExecution( '<FUNCTION_ID>'
, // functionId '', 
// body (optional) false,
 // async (optional) '', 
 // path (optional) ExecutionMethod.GET, 
 // method (optional) {}
  // headers (optional) 
);

    console.log(response);
