import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Link, router } from 'expo-router'

// Constants
import { images } from '../../constants'

// Components
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

// Appwrite SDK
import { signIn } from '../../lib/appwrite'

// Global context
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { setUser, setIsLoggedIn } = useGlobalContext()

    const submit = async () => {
        if (!form.email || !form.password) return Alert.alert('Error', 'Please fill in all fields')

        setIsSubmitting(true)

        try {
            const session = await signIn(form.email, form.password)
            setUser(session)
            setIsLoggedIn(true)

            Alert.alert('Success', 'User signed in successfully')
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode='contain'
                    />

                    <Text className="text-2xl text-white font-psemibold mt-10">
                        Log in to Aora
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChange={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyBoardType="email-address"
                        placeholder="Your email address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChange={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        placeholder="Your password"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn