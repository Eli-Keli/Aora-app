import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Trending = ({ posts }) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <View>
                    <Text className="text-3xl text-white">{item.id}</Text>
                </View>
            )}
            horizontal // horizontal is a prop that tells the list to render items horizontally
        />
    )
}

export default Trending