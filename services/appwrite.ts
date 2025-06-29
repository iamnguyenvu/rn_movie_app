import Constants from 'expo-constants';
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || Constants.expoConfig?.extra?.appwriteDatabaseId;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || Constants.expoConfig?.extra?.appwriteCollectionId;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || Constants.expoConfig?.extra?.appwriteProjectId;

if (!DATABASE_ID || !COLLECTION_ID || !PROJECT_ID) {
    throw new Error("Missing Appwrite configuration. Check .env file and app.config.js");
}

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        if (result.documents.length > 0) {
            const existingMovie = await result.documents[0]

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {count: existingMovie.count + 1},
            )
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            )
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return result.documents as unknown as TrendingMovie[];

    } catch (err) {
        console.log(err);
        throw err;
    }
}