import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Exercise() {
  const { name, image } = useLocalSearchParams();
  const navigation = useNavigation();
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  // Set the header title dynamically
  useEffect(() => {
    if (name) {
      navigation.setOptions({ title: name });
    }
  }, [name, navigation]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10); // Increment by 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time as MM:SS:MS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Keep 2 digits for ms

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {/* Timer Display */}
        <Text style={styles.timer}>{formatTime(time)}</Text>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.button}
          //   onPress={() => setIsRunning((prev) => !prev)} --will trun this on later
          onPress={() => setIsRunning(false)}
        >
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      </View>

      {/* Exercise Image */}
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Exercise Title */}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>Error! Failed to fetch from the backend!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  timerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  timer: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 30,
    borderRadius: 8,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});
