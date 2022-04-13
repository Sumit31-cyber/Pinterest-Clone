import { Image, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Pin from "../components/Pin";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pin
        pin={{
          title: "Pin Your Interest",
          image:
            "https://images.unsplash.com/photo-1634821180452-03804764326f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
        }}
      />
      <Pin
        pin={{
          title: "Pinned Interest",
          image:
            "https://images.unsplash.com/photo-1591579512782-69d339cd508c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
