import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import { useNhostClient } from "@nhost/react";

const RemoteImage = ({ fileId }) => {
  const [ratio, setRatio] = useState(1);
  const [imageUri, setImageUri] = useState("");

  const nhost = useNhostClient();

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
    }
  }, [imageUri]);

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({ fileId });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);
  if (!imageUri) {
    return <ActivityIndicator />;
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.image, { aspectRatio: ratio }]}
      resizeMode="cover"
    />
  );
};

export default RemoteImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 25,
    aspectRatio: 1 / 1,
  },
});
