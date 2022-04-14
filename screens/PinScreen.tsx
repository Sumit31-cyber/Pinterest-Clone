import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import pins from "../assets/data/pins";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const PinScreen = () => {
  const [ratio, setRatio] = useState(1);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const route = useRoute();
  const pinId = route.params.id;
  const pin = pins.find((p) => p.id === pinId);
  const goBack = () => {
    navigation.goBack();
  };
  if (!pin) return <Text>Pin Not Found</Text>;

  useEffect(() => {
    if (pin?.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin]);

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.container}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
          resizeMode="cover"
        />
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
