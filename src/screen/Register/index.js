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
import api from "../../utils/api";
import Logo from "../../assets/logo.png";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const formatPhone = (text) => {
    let formattedText = text.replace(/\D+/g, '');
    if (formattedText.length > 0) {
      formattedText = `(${formattedText.slice(0, 3)}) ${formattedText.slice(3, 6)}-${formattedText.slice(6, 10)}`;
    }
    return formattedText;
  };

  const handlePhoneChange = (text) => {
    setPhone(formatPhone(text));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    setError(null);

    if(fullName.trim().length === 0){
      setError("Full Name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        phone,
        password,
      });

      // Handle successful registration, e.g., redirect to login screen
      navigation.navigate("Login");
    } catch (error) {
      setError("Error during registration");
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

            <Text className="text-center text-white text-lg mb-6">
              Create a mobile app account {'\n'}
              entering your information bellow.
            </Text>
          </View>

          {error && <Text className="text-red-500 mb-5">{error}</Text>}
          
          <TextInput 
            className="w-80 h-12 px-3 mb-5 bg-white border border-gray-300 rounded-lg"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
            autoComplete="name"
            autoCorrect={false}
          />
          
          <TextInput
            className="w-80 h-12 px-3 mb-5 bg-white border border-gray-300 rounded-lg"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            className="w-80 h-12 px-3 mb-5 bg-white border border-gray-300 rounded-lg"
            placeholder="Phone Number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />

          <TextInput
            className="w-80 h-12 px-3 mb-8 bg-white border border-gray-300 rounded-lg"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            className="w-80 h-12 bg-blue-500 rounded-lg justify-center items-center"
            onPress={handleSubmit}
          >
            <Text className="text-base text-white font-bold">Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Register;