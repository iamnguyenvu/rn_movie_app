import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
    return (
        <Link href={`/movies/${id}` as any} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500/${poster_path}` :
                            `https://placeholder.co/600x400/1a1a1a/ffffff.png`
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className={"text-sm font-bold text-white"} numberOfLines={1}>{title}</Text>
                <View className={"flex-row items-center justify-start gap-x-1"}>
                    <Image source={icons.star} className={"size-4"}/>
                    <Text className={"text-sm text-white font-bold"}>{Math.round(vote_average * 10) / 10}</Text>
                </View>
                <View className={"flex-row items-center justify-between"}>
                    <Text className={"font-medium text-light-300 text-xs mt-1"}>{release_date?.split('-')[0]}</Text>
                    {/*<Text className={"text-xs font-medium uppercase text-light-300"}>Movie</Text>*/}
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard;