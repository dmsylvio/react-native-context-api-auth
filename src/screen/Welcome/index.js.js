import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import Logo from "../../assets/logo.png";

const Welcome = ({ navigation }) => {
  return(
    <SafeAreaView className="flex-1 bg-black justify-between">
      <View className="items-center mt-28">
        <Image 
          source={Logo}
          className="mb-5"
        />
        <Text className="text-white text-lg">Welcome to</Text>
        <Text className="text-white text-lg font-bold">Numbers Tax Accounting</Text>
      </View>

      <View className="items-center">
        <TouchableOpacity
          className="w-80 h-12 bg-white rounded-lg justify-center items-center mb-5"
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-base font-bold">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-80 h-12 rounded-lg justify-center items-center border-2 border-white"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-base text-white font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Welcome;