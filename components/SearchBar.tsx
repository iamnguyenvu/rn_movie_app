import {Image, Text, TextInput, View} from "react-native";
import {icons} from "@/constants/icons";

interface Props {
    placeHolder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({onPress, placeHolder, value, onChangeText}: Props) => {
    return (
        <View className="flex-row items-center px-5 py-4 bg-dark-200 rounded-full">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"/>
            <TextInput
                onPress={onPress}
                placeholder={placeHolder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#ab8bff"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
}

export default SearchBar;