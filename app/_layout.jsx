import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"

// Context provider
import { GlobalProvider } from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto hiding until we are ready to hide it

const RootLayout = () => {
  // Load fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync() // Hide splash screen when fonts are loaded
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null // Return null if fonts are not loaded yet

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false // Hide header
        }} />
        <Stack.Screen name="(auth)" options={{
          headerShown: false // Hide header
        }} />
        <Stack.Screen name="(tabs)" options={{
          headerShown: false // Hide header
        }} />
        {/* <Stack.Screen name="(/search/[query])" options={{
        headerShown: false // Hide header
      }} /> */}
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout