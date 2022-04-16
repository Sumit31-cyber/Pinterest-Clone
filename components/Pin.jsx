import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "./RemoteImage";

const Pin = (props) => {
  const { title, image, id } = props.pin;
  const [imageUri, setImageUri] = useState("");

  // const [ratio, setRatio] = useState(1);
  // const nhost = useNhostClient();
  // const fetchImage = async () => {
  //   const result = await nhost.storage.getPresignedUrl({
  //     fileId: image,
  //   });
  //   if (result.presignedUrl?.url) {
  //     setImageUri(result.presignedUrl.url);
  //   }
  // };

  // useEffect(() => {
  //   fetchImage();
  // }, [image]);

  // useEffect(() => {
  //   if (imageUri) {
  //     Image.getSize(imageUri, (width, height) => setRatio(width / height));
  //   }
  // }, [imageUri]);

  const navigation = useNavigation();

  const onLike = () => {};
  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <RemoteImage fileId={image} />
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
