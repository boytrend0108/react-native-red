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
  console.log(">>>>>>>>>>>> updateSearchCount", movie);
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);


    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
        searchTerm: query,
        count: 1,
        title: movie.title,
        movie_id: movie.id, // Assuming movie has an id property
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      });
    }
  } catch (error) {
    console.error("Error fetching search count:", error);
    throw error;
  }

}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
}