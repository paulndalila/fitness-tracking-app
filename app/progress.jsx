import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useNavigation } from "expo-router";

export default function Progress() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Your Progress this Week!" });
  }, []);

  const data = [
    { value: 200, label: "Mon" },
    { value: 250, label: "Tue" },
    { value: 180, label: "Wed" },
    { value: 300, label: "Thu" },
    { value: 220, label: "Fri" },
    { value: 270, label: "Sat" },
    { value: 320, label: "Sun" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Progress</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 40}
        height={250}
        yAxisTextStyle={{ color: "white" }}
        xAxisLabelTextStyle={{ color: "white" }}
        color="#FFA500"
        thickness={3}
        hideDataPoints
        hideRules
        yAxisLabelSuffix=" kcal"
        curved
        backgroundColor="#121212"
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Calories Burned: 1740 kcal</Text>
        <Text style={styles.summaryText}>Workouts Completed: 5</Text>
        <Text style={styles.summaryText}>Total Hours: 4.5 hrs</Text>
      </View>
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
  summary: {
    marginTop: 20,
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 8,
  },
  summaryText: { fontSize: 16, color: "#FFFFFF", marginBottom: 5 },
});
