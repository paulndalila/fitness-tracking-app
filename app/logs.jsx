import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";

const workoutLogs = [
  { id: "1", date: "Feb 27, 2025", workout: "30-Minute Run", calories: 250 },
  {
    id: "2",
    date: "Feb 26, 2025",
    workout: "Strength Training",
    calories: 180,
  },
  { id: "3", date: "Feb 25, 2025", workout: "Cycling", calories: 300 },
];

export default function Logs() {
  const navigation = useNavigation();

  // trigger on component mount
  useEffect(() => {
    navigation.setOptions({ title: "Exercise Logs!" });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Logs</Text>
      <FlatList
        data={workoutLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <Text style={styles.logText}>{item.date}</Text>
            <Text style={styles.logText}>{item.workout}</Text>
            <Text style={styles.logText}>{item.calories} kcal burned</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
  },
  logCard: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  logText: { color: "#FFFFFF", fontSize: 16 },
});
