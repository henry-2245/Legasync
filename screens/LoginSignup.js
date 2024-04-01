import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Placeholder for username
  

  const [isSignup, setIsSignup] = useState(false);

  const navigation = useNavigation();

  const handleAuthentication = async () => {
    try {
      if (isSignup) {
        // Handle signup logic
        const signupData = {
          email: email,
          password: password,
          username: username, // Pass username data for signup
        };

        const response = await fetch(
          'https://legasync.azurewebsites.net/user/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Assuming the response is JSON, you can parse it like this
        const result = await response.json();
        console.log(result);

        alert("Registered successfully");
        navigation.navigate("TabNavigator");
        await AsyncStorage.setItem('username', signupData.username);
        await AsyncStorage.setItem('email', signupData.email)
      } else {
        // Handle login logic
        const loginData = {
          email: email,
          password: password,
        };

        const response = await fetch(
          'https://legasync.azurewebsites.net/user/match',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          }
        );

        if (!response.ok) {
          alert("Invalid username or password");
        }

        // Assuming the response is JSON, you can parse it like this
        const result = await response.json();
        console.log(result);
        

        if (result.email === loginData.email ) {
          setUsername(result.username);
          await AsyncStorage.setItem('username', result.username);
          await AsyncStorage.setItem('email', result.email)
          // Login successful, navigate to the home page
          navigation.navigate("TabNavigator");

        } else {
          alert("Invalid username or password");
        }
      }
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("legasync/Images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>

      {/* Email input */}
      <View>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Password input */}
      <View>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* Conditionally render username input only for signup */}
      {isSignup && (
        <View>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      )}

      {/* Button and toggle text */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleAuthentication}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isSignup ? "Sign Up" : "Sign in"}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.toggleText} onPress={toggleSignup}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    padding: "5%",
    width: "90%",
    height: 150,
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30, // Reduced margin for better spacing
  },
  inputLabel: {
    color: "#FDE48A",
    marginBottom: 5,
  },
  input: {
    width: 328,
    height: 57,
    borderColor: "#FDE48A",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#fff",
  },
  buttonContainer: {
    width: 328,
    height: 57,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FDE48A",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 50,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  toggleText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginSignup;
