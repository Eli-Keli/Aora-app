import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from 'expo-router'

import "../global.css" // Import global styles

// Constants
import { images } from "../constants"

// Components
import CustomButton from '../components/CustomButton';

// Global context
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" /> // Redirect to home screen if user is logged in

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain'
            />
          </View>

          <Text className="text-sm text-gray-100 font-pregular mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")} // Navigate to sign-in screen
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}