import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import dailyBackground from "../assets/images/running.jpg";
import ProgressCircle from "react-native-progress/Circle";

export default function Daily() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <ImageBackground source={dailyBackground} style={styles.background}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Header */}
          <Animated.View
            entering={FadeInUp.duration(800)}
            style={styles.header}
          >
            <MaterialCommunityIcons name="fire" size={36} color="white" />
            <Text style={styles.title}>Workout of the Day</Text>
          </Animated.View>

          {/* Workout Details */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
            <Text style={styles.cardTitle}>🔥 30-Minute Run</Text>
            <Text style={styles.cardText}>
              Boost endurance and burn calories.
            </Text>
            <Text style={styles.cardSubText}>Duration: 30 min</Text>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(300)}
            style={{ marginTop: 20 }}
          >
            <ProgressCircle
              size={150}
              progress={1 - timeLeft / (30 * 60)}
              color="#00FF00"
              thickness={8}
              showsText={true}
              formatText={() => formatTime(timeLeft)}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(400)}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isRunning ? "#999" : "#FF4500" },
              ]}
              onPress={() => setIsRunning(false)} //i will turn it on later
              disabled={isRunning}
            >
              <Text style={styles.buttonText}>
                {isRunning ? "Running..." : "Start Now"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FFA500" }]}
              onPress={() => setIsRunning(false)}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#555" }]}
              onPress={() => {
                setIsRunning(false);
                setTimeLeft(30 * 60);
              }}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
  cardSubText: {
    fontSize: 14,
    color: "#AAAAAA",
    marginTop: 5,
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4500",
    marginTop: 10,
  },
  gif: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
