import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import imageBack from "@/assets/images/yoga.jpg";
import Footer from "../components/footer";
import { updateProfile } from "firebase/auth";
import {
  auth,
  createUserWithEmailAndPassword,
} from "../components/firebaseConfig"; // Import Firebase auth

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(user, { displayName: name });

      alert("Account created successfully!");
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const navigateToSignIn = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Image source={imageBack} style={styles.image} />

      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,1)"]}
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
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Already have an account?{" "}
          <Text style={styles.signupLink} onPress={navigateToSignIn}>
            Sign In
          </Text>
        </Text>
      </Animated.View>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContainer: {
    position: "absolute",
    top: "25%",
    width: "100%",
    alignItems: "center",
  },
  heroHeadContainer: {
    flexDirection: "row",
    gap: 4,
  },
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
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 16,
    textAlign: "center",
    color: "white",
  },
  signupLink: {
    color: "lightblue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignUp;
