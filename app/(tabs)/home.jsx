import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'

// Constants
import { images } from '../../constants'

// Appwrite SDK
import { getVideos } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

// Components
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'

const Home = () => {
    const { data: videos, refetch } = useAppwrite(getVideos)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setTimeout(() => setRefreshing(false), 2000)
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList // FlatList is a component that renders a list of items. It's a more efficient way to render lists than using a ScrollView
                data={videos} // data is an array of items to render

                keyExtractor={(item) => item.$id} // keyExtractor is a function that tells the list to use the id as the key for the items

                renderItem={({ item }) => (
                    <VideoCard video={item} />
                )} // renderItem is a function that renders each item in the list

                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-4">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome back
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    Eli!
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />
                            </View>
                        </View>

                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">
                                Trending videos
                            </Text>

                            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
                        </View>
                    </View>
                )} // ListHeaderComponent is a function that renders a header for the list

                ListEmptyComponent={() => (
                    <EmptyState title="No videos found" subtitle="Be the first one to upload a video" />
                )} // ListEmptyComponent is a function that renders when the list is empty

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // refreshControl is a component that adds pull-to-refresh functionality to the list
            />
        </SafeAreaView>
    )
}

export default Home