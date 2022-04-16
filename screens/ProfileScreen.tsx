import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import MasonaryList from "../components/MasonaryList";
import { Text, View } from "../components/Themed";
import pins from "../assets/data/pins";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const [user, setUser] = useState();
  const { signOut } = useSignOut();
  const nhost = useNhostClient();
  const userId = useUserId();

  const GET_USER_QUERY = `
  query MyQuery($id : uuid!) {
  user(id: $id){
    id,
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}`;

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    if (result.error) {
      Alert.alert("Error Fetching User", result.error.message);
    } else {
      setUser(result.data.user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

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
            uri: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
          }}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subTitle}>10k Followers | 125 Followings</Text>
      </View>

      <MasonaryList pins={user.pins} onRefresh={fetchUserData} />
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
