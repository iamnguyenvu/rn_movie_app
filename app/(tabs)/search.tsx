import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const {
        data: movies,
        loading,
        error,
        refetch: fetchMoviesRefetch,
        reset,
    }
        = useFetch(() => fetchMovies({
        query: searchQuery,
    }), false)

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) await fetchMoviesRefetch()
            else reset()
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchQuery]);

    return (
        <View className={"flex-1 bg-primary"}>
            <Image source={images.bg} className={"flex-1 absolute w-full z-0"} resizeMode={"cover"}/>
            <FlatList
                data={movies}
                renderItem={({item}) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className={"px-5"}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{paddingBottom: 10}}
                ListHeaderComponent={
                    <>
                        <View className={"w-full flex-row justify-center items-center mt-20"}>
                            <Image source={icons.logo} className={"w-12 h-10"}/>
                        </View>

                        <View className={"my-5"}>
                            <SearchBar placeHolder={"Search movie..."}
                                       value={searchQuery}
                                       onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator size={"large"} color={"#0000ff"} className={"my-3"}/>
                        )}

                        {error && (
                            <Text className={"text-red-500 px-5 my-3"}>
                                {error.message}
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className={"text-xl text-white font-bold"}>
                                Search result for{' '}
                                <Text className={"text-accent"}>{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className={"mt-10 px-5"}>
                            <Text className={"text-center text-gray-500"}>
                                {searchQuery.trim() ? "No movie found" : "Search for a movie"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

export default Search;