import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import MasonaryList from "../components/MasonaryList";
import { Text, View } from "../components/Themed";
import pins from "../assets/data/pins";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNhostClient, useSignOut } from "@nhost/react";

export default function ProfileScreen() {
  const { signOut } = useSignOut();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather name="share" size={24} color="black" style={styles.icon} />
          </Pressable>
          <MaterialIcons
            name="more-horiz"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
        />
        <Text style={styles.title}>Sumit @Bravo</Text>
        <Text style={styles.subTitle}>10k Followers | 125 Followings</Text>
      </View>

      <MasonaryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    borderRadius: 100,
    aspectRatio: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subTitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
});
