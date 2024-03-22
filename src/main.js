import { Client, Databases } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Initialize the Appwrite client
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65f8fe7c1b33b33daac1')
    .setKey('65fa3390b6b4498e48a4');

  // Initialize database and collection IDs
  const dbId = '65f8ff0c59be436ec9cb';
  const collectionId = '65fcfa5c603ab403cd6f';

  // Initialize the Appwrite database instance
  const db = new Databases(client);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    try {
      // List documents in the collection
      const response = await db.listDocuments(dbId, collectionId);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching documents' });
    }
  }

  if (req.method === 'POST') {
    try {
      // Get the documents from the request body
      const documents = req.body;

      // Validate input (if needed)

      // Insert the documents into the collection
      
      const response = await db.createDocument(dbId, collectionId, documents);

      // Return a success response
      return res.json({
        success: true,
        message: 'Documents inserted successfully',
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error inserting documents' });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method Not Allowed' });
};