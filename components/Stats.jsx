import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Stats = ({ steps, calories, streak }) => {
  // Goal values
  const goalSteps = 10000;
  const goalCalories = 600;
  const goalStreak = 7;

  // Calculate progress percentages
  const stepsProgress = (steps / goalSteps) * 100;
  const caloriesProgress = (calories / goalCalories) * 100;
  const streakProgress = (streak / goalStreak) * 100;

  const renderChart = (title, progress, total, goal, color) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <View style={styles.pieWrapper}>
        <PieChart
          data={[
            { value: progress, color: color },
            { value: 100 - progress, color: "#ddd" },
          ]}
          donut
          radius={65}
          textSize={14}
          textColor="#000"
          innerRadius={40}
          innerCircleColor="#fff"
        />
        <Text style={styles.centerText}>{Math.round(progress)}%</Text>
      </View>
      <Text style={styles.chartValue}>
        {total} / {goal}
      </Text>
    </View>
  );

  return (
    <View>
      <View>
        <Text style={styles.statsTitle}>Todays Stats</Text>
      </View>
      <View style={styles.container}>
        {renderChart("Steps", stepsProgress, steps, goalSteps, "#ff8c00")}
        {renderChart(
          "Calories",
          caloriesProgress,
          calories,
          goalCalories,
          "#ff4500"
        )}
        {renderChart("Streak", streakProgress, streak, goalStreak, "#32cd32")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    marginLeft: 10,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  pieWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  chartValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ccc",
    marginTop: 5,
  },
});

export default Stats;
