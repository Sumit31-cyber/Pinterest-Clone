import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "../components/RemoteImage";

const PinScreen = ({ image }) => {
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState([]);

  const nhost = useNhostClient();

  const navigation = useNavigation();
  const route = useRoute();

  const pinId = route.params.id;

  const GET_PINS_QUERY = `
  query MyQuery ($id : uuid!) {
    pins_by_pk(id: $id) {
      created_at
      id
      image
      title
      user_id
      user {
        avatarUrl
        displayName 
      }
    }
  }
  `;

  const fetchPin = async (pinId) => {
    const response = await nhost.graphql.request(GET_PINS_QUERY, { id: pinId });
    if (response.error) {
      Alert.alert("Error");
    } else {
      setPin(response.data.pins_by_pk);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchPin(pinId);
  }, [pinId]);

  const goBack = () => {
    navigation.goBack();
  };
  if (!pin) return <Text>Pin Not Found</Text>;

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.container}>
        <RemoteImage fileId={pin.image} />
        <Text style={styles.text}>{pin.title}</Text>
        <Pressable
          style={[styles.backBtn, { top: insets.top }]}
          onPress={goBack}
        >
          <AntDesign name="back" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // marginTop: StatusBar.currentHeight,
  },
  image: {
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  text: {
    margin: 10,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 35,
  },
  backBtn: {
    position: "absolute",
    left: 20,
  },
});
