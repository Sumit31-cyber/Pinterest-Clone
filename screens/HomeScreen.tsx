import { FlatList, Image, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Pin from "../components/Pin";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import pins from "../assets/data/pins";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Column */}
      <View style={styles.column}>
        {pins.map((pin, index) => {
          if (index % 2 === 0) return <Pin key={pin.id} pin={pin} />;
        })}
      </View>

      {/* Second Column */}
      <View style={styles.column}>
        {pins.map((pin, index) => {
          if (index % 2 !== 0) return <Pin key={pin.id} pin={pin} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  column: {
    flex: 1,
  },
});
