import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import homeBackground from "../assets/images/exercises/34 sit up.jpg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import Footer from "../components/footer";
import { useRouter } from "expo-router";

const exercises = [
  { id: "0001", name: "3/4 sit-up", image: homeBackground },
  {
    id: "0002",
    name: "45° side bend",
    image: require("../assets/images/exercises/45 side bend.jpg"),
  },
  {
    id: "0003",
    name: "air bike",
    image: require("../assets/images/exercises/air bike.jpg"),
  },
  {
    id: "0006",
    name: "alternate heel touchers",
    image: require("../assets/images/exercises/heel touch.png"),
  },
  {
    id: "0007",
    name: "alternate lateral pulldown",
    image: require("../assets/images/exercises/lat-pulldown-alternatives.png"),
  },
  {
    id: "0009",
    name: "assisted chest dip (kneeling)",
    image: require("../assets/images/exercises/ass chest dip.png"),
  },
  {
    id: "0010",
    name: "assisted hanging knee raise with throw down",
    image: require("../assets/images/exercises/hanging knee.png"),
  },
  {
    id: "0011",
    name: "assisted hanging knee raise",
    image: require("../assets/images/exercises/knee raise.jpg"),
  },
  {
    id: "0012",
    name: "assisted lying leg raise with lateral throw down",
    image: require("../assets/images/exercises/ass leg throw.png"),
  },
  {
    id: "0013",
    name: "assisted lying leg raise with throw down",
    image: require("../assets/images/exercises/throw down.jpg"),
  },
];

export default function Workout() {
  const router = useRouter();

  const handlePress = (exercise) => {
    router.push({
      pathname: "/exercise",
      params: { eid: exercise.id, name: exercise.name, image: exercise.image },
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.header}
        entering={FadeInUp.duration(800).springify()}
      >
        <MaterialCommunityIcons name="dumbbell" size={36} color="white" />
        <Animated.Text entering={FadeInUp.delay(200)} style={styles.title}>
          Exercises
        </Animated.Text>
      </Animated.View>

      <FlatList
        data={exercises}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <ImageBackground
              source={item.image}
              style={styles.image}
              imageStyle={{ borderRadius: 12 }}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.gradient}
              >
                <Text style={styles.exerciseName}>{item.name}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
      <View style={styles.space}></View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#121212",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 0,
    marginTop: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    padding: 10,
    alignItems: "center",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  space: {
    height: 30,
  },
});
