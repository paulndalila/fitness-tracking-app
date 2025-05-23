import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from "../components/footer";
import Stats from "../components/Stats";
import homeBackground from "../assets/images/runn.jpg";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const checkUserSession = async () => {
      const storedUser = await AsyncStorage.getItem("userSession");
      if (storedUser) {
        setUserName(JSON.parse(storedUser).displayName || "User");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserName(user.displayName || "User");
        await AsyncStorage.setItem("userSession", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("userSession");
        router.replace("/");
      }
    });

    checkUserSession();

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      await AsyncStorage.removeItem("userSession");
      router.replace("/");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundWrapper}>
        <Image
          source={homeBackground}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      <LinearGradient
        colors={["transparent", "#1b1c1e"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header with Logout */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>BoostFit</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <View style={styles.heroGradient}>
              <Text style={styles.heroText}>
                {getGreeting()}, {userName}!
              </Text>
              <Text style={styles.heroSubText}>
                "Get Advanced Results with our Advanced Fitness App!"
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/workout")}
            >
              <MaterialIcons name="fitness-center" size={28} color="white" />
              <Text style={styles.actionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/logs")}
            >
              <Ionicons name="clipboard-outline" size={28} color="white" />
              <Text style={styles.actionText}>Log Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/progress")}
            >
              <FontAwesome5 name="chart-line" size={28} color="white" />
              <Text style={styles.actionText}>Check Progress</Text>
            </TouchableOpacity>
          </View>

          {/* Workout of the Day */}
          <Animated.View style={styles.card} entering={FadeInUp.duration(800)}>
            <Text style={styles.cardTitle}>Workout of the Day</Text>
            <Text style={styles.cardText}>🔥 30-minute Run (30 min)</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => router.push("/daily")}
            >
              <Text style={styles.cardButtonText}>Start Now</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Stats */}
          <Stats steps={2000} calories={450} streak={5} />
        </ScrollView>
      </LinearGradient>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    position: "relative",
  },
  backgroundWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height * 0.2,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  heroContainer: {
    marginTop: height * 0.08,
    alignItems: "center",
  },
  heroGradient: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    backgroundColor: "#ff5722",
  },
  heroText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  heroSubText: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  actionButton: {
    backgroundColor: "#ff5722",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },
  actionText: {
    color: "white",
    marginTop: 6,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "white",
    marginVertical: 6,
  },
  cardButton: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cardButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomeScreen;
