import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Copyright &copy; 2025 | Kipsang Koech | CIM/00033/022 | Maseno
        University
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#000000",
  },
  footerText: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
  },
});

{
  /* <Animated.View
        style={styles.footer}
        entering={FadeInUp.duration(800).delay(500)}
      >
        <Text style={styles.footerText}>
          Copyright &copy; 2025 | Kipsang Koech | CIM/00033/022 | Maseno
          University
        </Text>
      </Animated.View> */
}
