import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useAuth } from "../../context/auth"
import api from "../../utils/api";
import Logo from "../../assets/logo.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data);
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios"? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1 items-center justify-center bg-black">
          <View>
            <Image 
              source={Logo}
              resizeMode="contain"
              className="mb-5"
            />

            <Text className="text-center text-white text-base mb-6">
              Welcome to NTA app {'\n'}
              enter using {'\n'} 
              your email and password.
            </Text>
          </View>

          {error && <Text className="text-red-500 mb-5">{error}</Text>}
          <TextInput
            className="w-80 h-12 px-3 mb-5 bg-white border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            className="w-80 h-12 px-3  bg-white border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TouchableOpacity
            className="w-80 h-12 justify-center mb-5"
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.7}
          >
            <Text className="text-base text-blue-500 underline">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-80 h-12 bg-blue-500 rounded-lg justify-center items-center"
            onPress={handleSubmit}
          >
            <Text className="text-base text-white font-bold">Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Login;