import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { Image } from "expo-image";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { x_rapidapi_key, x_rapidapi_host } from "@env";

export default function Exercise() {
  const { eid } = useLocalSearchParams();
  const navigation = useNavigation();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${eid}`,
          {
            headers: {
              "x-rapidapi-host": `${x_rapidapi_host}`,
              "x-rapidapi-key": `${x_rapidapi_key}`,
            },
          }
        );
        setExercise(response.data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [eid]);

  useEffect(() => {
    if (exercise?.name) {
      navigation.setOptions({ title: exercise.name });
    }
  }, [exercise, navigation]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.container}
        >
          {/* Timer Section */}
          <Animated.View
            entering={FadeInUp.delay(200)}
            style={styles.timerContainer}
          >
            <Text style={styles.timer}>{formatTime(time)}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                isRunning ? styles.buttonPause : styles.buttonStart,
              ]}
              onPress={() => setIsRunning((prev) => !prev)}
            >
              <Text style={styles.buttonText}>
                {isRunning ? "Pause" : "Start"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Exercise GIF */}
          {exercise?.gifUrl && (
            <Image
              source={{ uri: exercise.gifUrl }}
              style={styles.image}
              contentFit="cover"
            />
          )}

          {/* Exercise Details */}
          <Animated.View
            entering={FadeInUp.delay(600)}
            style={styles.textContainer}
          >
            <Text style={styles.title}>{exercise?.name}</Text>
            <Text style={styles.subtitle}>
              {exercise?.bodyPart} - {exercise?.target}
            </Text>
            <Text style={styles.equipmentText}>
              Equipment: {exercise?.equipment}
            </Text>
          </Animated.View>

          {/* Instructions */}
          {exercise?.instructions && (
            <Animated.View
              entering={FadeInUp.delay(800)}
              style={styles.instructionsContainer}
            >
              <Text style={styles.instructionsTitle}>How to Perform:</Text>
              {exercise.instructions.map((instruction, index) => (
                <Text key={index} style={styles.instruction}>
                  {index + 1}. {instruction}
                </Text>
              ))}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  timer: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 15,
  },
  buttonStart: {
    backgroundColor: "#4CAF50",
  },
  buttonPause: {
    backgroundColor: "#FF8C00",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#BBBBBB",
    textAlign: "center",
  },
  equipmentText: {
    fontSize: 16,
    color: "#FF8C00",
    textAlign: "center",
    marginTop: 5,
  },
  instructionsContainer: {
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
});
