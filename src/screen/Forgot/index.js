import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

import api from "../../utils/api";
import Logo from "../../assets/logo.png";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setErrorMessage(null);

    if(!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return
    }

    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage("Password reset instructions sent to your email");
    } catch (error) {
      setMessage("Error sending password reset instructions");
      console.error(error);
    }
  };

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios"? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <Image 
          source={Logo}
          className="mb-5"
        />
        {message && <Text className="text-green-500 mb-5">{message}</Text>}
        {errorMessage && <Text className="text-red-500 mb-5">{errorMessage}</Text>}
        <TextInput
          className="w-80 h-12 px-3 mb-5 bg-white border border-gray-300 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text className="text-white text-base w-80 mb-10">
          Enter your email and we will send you reset password link.
        </Text>
        <TouchableOpacity
          className="w-80 h-12 bg-blue-500 rounded-lg justify-center items-center"
          onPress={handleSubmit}
        >
          <Text className="font-bold text-white text-base">Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword;