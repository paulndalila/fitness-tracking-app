import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebaseConfig"; // Ensure firebaseConfig.js is set up
import imageBack from "@/assets/images/man2.jpg";
import Footer from "../components/footer";

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home"); // Navigate to home after successful login
    } catch (error) {
      Alert.alert("Login Failed", "Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push("/signup");
  };

  return (
    <View style={styles.container}>
      <Image source={imageBack} style={styles.image} />

      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      />

      <Animated.View
        style={styles.heroContainer}
        entering={FadeInUp.duration(800)}
      >
        <View style={styles.heroHeadContainer}>
          <Text style={styles.heroMainText}>CampusFit</Text>
          <Text style={styles.heroText}>Connect</Text>
        </View>
        <Text style={styles.heroSubText}>Elevate Your Fitness Journey</Text>
      </Animated.View>

      <Animated.View
        style={styles.formContainer}
        entering={FadeInUp.duration(800)}
      >
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#ccc"
        />
        <View style={styles.fp}>
          <Text style={styles.fpt}>forgot password?</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "LOGIN"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={styles.signupLink} onPress={navigateToSignUp}>
            Sign Up
          </Text>
        </Text>
      </Animated.View>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { position: "absolute", width: "100%", height: "100%" },
  gradient: { ...StyleSheet.absoluteFillObject },
  heroContainer: {
    position: "absolute",
    top: "40%",
    width: "100%",
    alignItems: "center",
  },
  heroHeadContainer: { flexDirection: "row", gap: 4 },
  heroMainText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "pink",
    textAlign: "center",
  },
  heroText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  heroSubText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 10,
    padding: 16,
    marginBottom: "30%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: "white",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  fp: {
    alignItems: "flex-end",
  },
  fpt: {
    color: "#fff",
    paddingRight: 4,
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  signupText: { marginTop: 16, textAlign: "center", color: "white" },
  signupLink: {
    color: "lightblue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Index;
