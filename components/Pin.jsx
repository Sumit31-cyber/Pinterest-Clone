import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const Pin = (props) => {
  const { title, image, id } = props.pin;

  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRatio(width / height));
    }
  }, [image]);

  const navigation = useNavigation();

  const onLike = () => {};
  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          style={[styles.image, { aspectRatio: ratio }]}
          resizeMode="cover"
          source={{
            uri: image,
          }}
        />
        <Pressable onPress={onLike} style={styles.iconContainer}>
          <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Pin;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 25,
    aspectRatio: 1 / 1,
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#181818",
    margin: 10,
  },
  pin: {
    width: "100%",
    padding: 5,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8C6C6",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
