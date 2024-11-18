import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const SearchInput = ({
    title,
    value,
    placeholder,
    handleChange,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4 ">
            <TextInput
                className="flex-1 mt-0.5 text-white font-regular text-base"
                value={value}
                placeholder="Search for a video topic"
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChange}
                secureTextEntry={title === "Password" && !showPassword} // This is to hide the text input for password
            />

            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput