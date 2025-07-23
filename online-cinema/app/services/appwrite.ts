import { Client, Databases, Query } from "appwrite";

// track the searches made by the user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
  ;

const database = new Databases(client);


export const updateSearchCount = async (query: string, movie: Movie) => {
  console.log(">>>>>>>>>>>>", query);

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTemr", query),
    ]);

    console.log(">>>>>>>>>>>>", result);
  } catch (error) {
    console.error("Error fetching search count:", error);
  }

}