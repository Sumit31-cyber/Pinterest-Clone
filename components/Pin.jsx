import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";

const Pin = (props) => {
  const { title, image } = props.pin;

  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRatio(width / height));
    }
  }, [image]);

  const onLike = () => {};

  return (
    <View style={styles.pin}>
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

      <Text style={styles.title}>{title}</Text>
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  pin: {
    width: "100%",
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