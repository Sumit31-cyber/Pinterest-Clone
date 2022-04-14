import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CreatePin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const submit = () => {};

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <Pressable onPress={pickImage} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Pick Image From Gallery</Text>
      </Pressable>
      {image && (
        <React.Fragment>
          <TextInput
            placeholder="Title..."
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <Pressable onPress={submit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>

          <Image source={{ uri: image }} style={styles.image} />
        </React.Fragment>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: "#DD4A48",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    marginVertical: 10,
    aspectRatio: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    width: "100%",
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
