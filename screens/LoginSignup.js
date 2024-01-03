import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
    if (email !== "" && password !== "") {
      // Navigate to home page
      navigation.navigate("Home");
    } else {
      alert("Please fill in your info");
    }
  };

  const handleSignup = () => {
    // Handle signup logic here
    alert("Registered successfully");
    navigation.navigate("Home");
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("legasync/Images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

<Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={isSignup ? handleSignup : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isSignup ? "Sign Up" : "Sign in"}
          </Text>
        </TouchableOpacity>
      </View>

      
      

      <Text style={styles.toggleText} onPress={toggleSignup}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
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
    marginBottom: 70,
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
    borderWidth: 1,
  },

  buttonContainer: {
    
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FDE48A",
    borderRadius: 8,
    overflow: "hidden", // This ensures that the borderRadius is applied to the child components
    marginTop: 50,
  },

  button: {
    width: 328,
    height: 57,
    
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"

  },
  toggleText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "white",
    marginTop: 10,
    // textDecorationLine: "underline", // Add u
    alignSelf: "flex-end",
    marginRight: 50,
    fontSize: 16,
    
  }
});

export default LoginSignup;
