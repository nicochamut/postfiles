import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65f8fe7c1b33b33daac1')
  .setKey('65fa3390b6b4498e48a4');


  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send('Hello, World!');
  }

 
  if (req.method === 'POST') {
    try {
      // Get the documents from the request body
      const documents = req.body;

      // Initialize the Appwrite database instance
      const database = new Database(client);

      // Define the collection ID where you want to insert the documents
      const collectionId = '65fcfa5c603ab403cd6f';

      // Insert the documents into the collection
      const response = await database.createDocument(collectionId, documents);

      // Return a success response
      return res.json({
        success: true,
        message: 'Documents inserted successfully',
        data: response,
      });
    } catch (error) {
      // Return an error response if something goes wrong
      return res.status(500).json({
        success: false,
        message: 'An error occurred while inserting documents',
        error: error.message,
      });
    }
  }
  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
