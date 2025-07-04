export default {
    expo: {
        name: "MovieFlix",
        slug: "mobile-movie-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/logo.png",
        scheme: "mobilemovieapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/logo.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/logo.png"
        },
        plugins: [
            "expo-router", [
                "expo-splash-screen",
                {
                    image: "./assets/images/logo.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            movieApiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
            appwriteProjectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
            appwriteDatabaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            appwriteCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
        }
    }
};