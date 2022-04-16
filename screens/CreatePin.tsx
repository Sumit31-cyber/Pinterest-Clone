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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

export default function CreatePin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const navigation = useNavigation();
  const CREATE_PIN_MUTATUON = `mutation MyMutation($image: String!, $title: String) {
    insert_pins(objects: {image: $image, title: $title}) {
      returning {
        created_at
        id
        image
        title
        user_id
      }
    }
  }`;
  const nhost = useNhostClient();

  const uploadFile = async () => {
    if (!image) {
      return {
        error: {
          message: "Please select an image",
        },
      };
    }
    const parts = image.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".")[1];
    const extension = nameParts[nameParts.length - 1];
    const result = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extension}`,
        uri: image,
      },
    });
    return result;
  };

  const submit = async () => {
    // Todo Upload image to storage
    const uploadResult = await uploadFile();
    if (uploadResult.error) {
      Alert.alert("Error", uploadResult.error.message);
      return;
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATUON, {
      title,
      image: uploadResult.fileMetadata.id,
    });
    if (result.error) {
      Alert.alert("error Creating Post", result.error.message);
    } else {
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

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
